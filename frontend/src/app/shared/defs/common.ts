export type NonNullableProperties<Type> = {
  [Property in keyof Type]: NonNullable<Type[Property]>
}
