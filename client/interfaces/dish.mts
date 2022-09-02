export type Dish = {
    _id: string,
    id: string,
    name: string,
    price: number,
    ingredients: {},
    ratingsAverage: number,
    ratingsQuantity: number,
    description: string,
    image: string
    favoriteQuantity: number,
    createdAt: Date,
    forToday: Boolean,
}