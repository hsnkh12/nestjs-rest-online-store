
export interface Item{

    product_id : string 
    product_a_id : string
    product_name : string
    quantity : number
    total_price : number
}

export interface Cart{
    
    total_price : number
    items: Item[]
}