import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtUser } from 'src/auth/models/jwt-user';
import { Transaction } from './entities/transactions.entity';
import { Account } from 'src/accounts/entities/account.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Category } from 'src/categories/entities/categories.entity';
import { AccountsService } from 'src/accounts/accounts.service';
import { TransactionType } from './models/transaction.model';
import { log } from 'console';
import * as Tesseract from 'tesseract.js';
import * as fs from 'fs';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
    private readonly accountsService: AccountsService,
  ) {}

  private async getUserFromJwt(jwtUser: JwtUser): Promise<User> {
    return this.userRepo.findOneBy({ id: jwtUser.sub });
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
    userJwt: JwtUser,
  ): Promise<Transaction[]> {
    const user = await this.getUserFromJwt(userJwt);
    const account = await this.accountRepo.findOneBy({
      id: createTransactionDto.accountId,
    });
    const category = await this.categoryRepo.findOneBy({
      id: createTransactionDto.categoryId,
    });

    if (!account) throw new Error('Account not found');
    if (!category) throw new Error('Category not found');

    const transaction = this.transactionRepo.create({
      name: createTransactionDto.name,
      amount: createTransactionDto.amount,
      date: createTransactionDto.date,
      type: createTransactionDto.type,
      category,
      account,
      user,
    });

    await this.transactionRepo.save(transaction);
    await this.accountsService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type,
      'add',
    );

    return this.getAllTransactions(userJwt);
  }

  async processTransactionImg(filePath: string): Promise<any> {
    try {
      const { data } = await Tesseract.recognize(filePath, 'pol');
      fs.unlinkSync(filePath);
      return this.extractTransaction(data.text);
    } catch (error) {
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }

  private async extractTransaction(text: string) {
    const dateMatch = text.match(/Data (\d{2})\/(\d{2})\/(\d{4})/);
    const amountMatch = text.match(
      /Suma PLN (\d+,\d{2})|Sprzedaż opodatkowana C (\d+,\d{2})/,
    );
  
    const date = dateMatch ? `${dateMatch[3]}-${dateMatch[2]}-${dateMatch[1]}` : null;
    const amountStr = amountMatch ? amountMatch[1] || amountMatch[2] : null;
    const amount = amountStr ? parseFloat(amountStr.replace(',', '.')) : null;
    const categoryId = this.getTransactionCategory(text);
    const category = await this.categoryRepo.findOneBy({
      id: categoryId,
    });
    
    return {
      date,
      amount,
      type: TransactionType.EXPENSE,
      categoryId: category.id,
      categoryLabel: category.name
    };
  }
  
  private getTransactionCategory(text: string): string {
    const categoryKeywords: { [key: string]: string[] } = {
      'cat-2': [
        'BIEDRONKA', 'LIDL', 'AUCHAN', 'CARREFOUR', 'TESCO', 'KAUFLAND', 'ŻABKA',
        'ROSSMANN', 'SUPERMARKET', 'MARKET', 'SKLEP', 'ZAKUPY', 'KOSZYK', 
        'HURTOWNIA', 'DROGERIA', 'RTV', 'AGD', 'MEDIA EXPERT', 'SATURN',
        'AVANS', 'NEONET', 'X-KOM', 'MORELE', 'KOMPUTRONIK', 'PEPCO', 'CCC', 
        'RESERVED', 'HM', 'ZARA', '4F', 'ADIDAS', 'NIKE', 'DECATHLON'
      ],
      'cat-3': [
        'CZYNSZ', 'GAZ', 'PRĄD', 'WYNAJEM', 'MIESZKANIE', 'WODA', 'ŚMIECI',
        'INTERNET', 'MEDIA', 'OPŁATA ADMINISTRACYJNA', 'WYPOŻYCZENIE',
        'ORANGE', 'PLAY', 'PLUS', 'T-MOBILE', 'UPC', 'VECTRA', 'NETIA',
        'GAZOWNIA', 'PGNIG', 'ENERGA', 'TAURON', 'PGE', 'VEOLIA'
      ],
      'cat-4': [
        'UBEZPIECZENIE', 'POLISA', 'OC', 'AC', 'NA ŻYCIE', 'NA DOM', 'NA AUTO',
        'PZU', 'ALLIANZ', 'AVIVA', 'COMPENSA', 'GENERALI', 'WARTA', 'LINK4',
        'AXA', 'NATIONALE-NEDERLANDEN'
      ],
      'cat-5': [
        'PKP', 'KOLEJ', 'BILET', 'PALIWO', 'STACJA', 'AUTOBUS', 'TAXI', 
        'UBER', 'BOLT', 'PARKING', 'MYJNIA', 'OPŁATA DROGOWA', 'ORLEN',
        'BP', 'SHELL', 'LOTOS', 'MOYA', 'CIRCLE K', 'AUTO NAPRAWA', 'WARSZTAT',
        'MECHANIK', 'OPONY', 'SERWIS', 'AUTOSTRADA', 'MOTOCYKLE'
      ],
      'cat-7': [
        'LEKARZ', 'APTEKA', 'LEKI', 'SZPITAL', 'DENTYSTA', 'STOMATOLOG', 
        'OKULISTA', 'BADANIA', 'LABORATORIUM', 'TERAPIA', 'FIZJOTERAPIA',
        'REHABILITACJA', 'PSYCHOLOG', 'DIAGNOSTYKA', 'LUXMED', 'MEDICOVER',
        'ENEL-MED', 'SANEPID', 'SZCZEPIENIE'
      ],
      'cat-8': [
        'DZIECI', 'SZKOŁA', 'PRZEDSZKOLE', 'ŻŁOBEK', 'ZABAWKI', 'KOMUNIA', 
        'CHRZEST', 'WYCHOWANIE', 'OBIAD SZKOLNY', 'PODRĘCZNIKI', 'MEBLE DZIECIĘCE',
        'KLOCKI LEGO', 'WÓZEK', 'FOTELIK', 'KARMIENIE', 'PIELUCHY', 'HIPP',
        'BOBOVITA', 'SMOCZEK', 'URODZINY', 'PREZENT'
      ],
      'cat-9': [
        'KINO', 'NETFLIX', 'TEATR', 'RESTAURACJA', 'BAR', 'PUB', 'IMPREZA',
        'BOWLING', 'KONCERT', 'MECZ', 'GRY', 'KSIĄŻKA', 'MUZEUM', 'ESCAPE ROOM',
        'BASEN', 'AQUAPARK', 'SPA', 'WYJAZD', 'WAKACJE', 'LOT', 'RYANAIR',
        'WIZZ AIR', 'HOTEL', 'BOOKING', 'AIRBNB', 'SKYSCRANNER'
      ],
      'cat-10': [
        'OSZCZĘDNOŚCI', 'LOKATA', 'BANK', 'FUNDUSZ', 'INWESTYCJA', 
        'KONTO OSZCZĘDNOŚCIOWE', 'OBLIGACJE', 'AKCJE', 'EMERYTURA', 'IKE', 
        'IKZE', 'GPW', 'FOREX', 'BITCOIN', 'KRYPTO', 'ETF', 'XTB', 'DEGIRO', 
        'REVOLUT', 'WALUTA', 'WYPŁATA Z BANKOMATU'
      ]
    };
  
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((word) => text.toUpperCase().includes(word))) {
        return category;
      }
    }
  
    return 'cat-2';
  }

  async updateTransaction(
    updateTransactionDto: UpdateTransactionDto,
    userJwt: JwtUser,
  ): Promise<Transaction[]> {
    const user = await this.getUserFromJwt(userJwt);
    const account = await this.accountRepo.findOneBy({
      id: updateTransactionDto.accountId,
    });
    const transaction = await this.transactionRepo.findOne({
      where: { id: updateTransactionDto.id, user },
      relations: ['category', 'account'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    await this.accountsService.updateAccountBalance(
      transaction.account.id,
      transaction.amount,
      transaction.type,
      'subtract',
    );

    transaction.name = updateTransactionDto.name;
    transaction.amount = updateTransactionDto.amount;
    transaction.date = updateTransactionDto.date;
    transaction.type = updateTransactionDto.type;
    transaction.account = account;

    if (updateTransactionDto.categoryId) {
      transaction.category = await this.categoryRepo.findOne({
        where: { id: updateTransactionDto.categoryId },
      });
    }

    await this.transactionRepo.save(transaction);
    await this.accountsService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type,
      'add',
    );

    return this.getAllTransactions(userJwt);
  }

  async removeTransaction(id: string): Promise<void> {
    const transaction = await this.transactionRepo.findOne({
      where: { id },
      relations: ['account'],
    });

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    const account = await this.accountRepo.findOneBy({
      id: transaction.account.id,
    });

    await this.accountsService.updateAccountBalance(
      account.id,
      transaction.amount,
      transaction.type,
      'subtract',
    );

    await this.transactionRepo.delete(id);
  }

  async getAllTransactions(jwtUser: JwtUser): Promise<any[]> {
    const user = await this.getUserFromJwt(jwtUser);

    const transactions = await this.transactionRepo.find({
      where: { user },
      relations: ['category', 'account'],
      order: { date: 'DESC' },
    });

    return transactions.map((transaction) => ({
      id: transaction.id,
      name: transaction.name,
      amount: transaction.amount,
      date: transaction.date,
      type: transaction.type,
      categoryId: transaction.category?.id || null,
      categoryLabel: transaction.category?.name || null,
      accountId: transaction.account?.id || null,
      accountLabel: transaction.account?.name || null,
    }));
  }

  async getCategoryExpenses(jwtUser: JwtUser): Promise<any[]> {
    const user = await this.getUserFromJwt(jwtUser);

    const transactions = await this.transactionRepo.find({
      where: { user },
      relations: ['category'],
    });

    return transactions.reduce((acc, transaction) => {
      if (!transaction.category) return acc;

      const categoryId = transaction.category.id;
      const amount = Number(transaction.amount);

      if (isNaN(amount)) return acc;

      const existingCategory = acc.find(
        (item) => item.categoryId === categoryId,
      );
      if (existingCategory) {
        existingCategory.amount += amount;
      } else {
        acc.push({ categoryId, amount });
      }

      return acc;
    }, []);
  }
}
