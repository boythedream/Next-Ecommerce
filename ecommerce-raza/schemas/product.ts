
// Description: This file defines the schema of the product in the Sanity Studio.   `  
export default {
    name: 'product',
    type: 'document',
    title: 'Product',
    fields:[
        {
            name: 'name',
            type: 'string',
            title: 'Name of Products'
        },
        {
            name: 'images',
            type: 'array',
            title: 'Product Images',
            of:[{type: 'image'}]
        },
       
        {
            name: 'description',
            type: 'text',
            title: 'Description of product'
        },
       {
        name: 'slug',
        type: 'slug',
        title: 'Product Slug',
        options: {
            source: 'name',
            maxLength: 961

       }
    },
         {
          name: 'price',
          type: 'number',
          title: 'Price of Product'
         },
         {
          name: 'price_id',
          title:"Stripe Price ID",
          type:"string"
         },
         {
            name: 'category',
            type: 'reference',
            title: 'Product Category',
            to: [{type: 'category'}]
         }
        
    ]
}