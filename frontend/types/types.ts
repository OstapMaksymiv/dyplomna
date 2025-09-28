export interface User {
    id:string,
    email:string        
    password:string
    transactions?:Transaction[]
    categories?:Category[]
    budgets?:Budget[]
}

export interface Transaction {
    id:string  
    amount:number
    type:string
    date:string
    note?:string
    userId:string
    categoryId:string
    user:User
    category:Category
}

export interface Category {
    id:string 
    name:string   
    type:string
    userId:string
    user:User
    transactions:Transaction 
    budgets:Budget
}

export interface Budget {
    id:string
    limit:number
    current:number 
    userId:string
    categoryId:string
    user:User
    category:Category
}