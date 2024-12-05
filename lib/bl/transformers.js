const getCustomerByEmail = `
{   "data":      
    {         
        "exists": $[0].active
    }
}`;
const PLP = `
{  "data": {              
    "totalItems": totalElements, 
    "size":size,
    "totalPages": totalPages,
    "pageNumber": pageable.pageNumber,     
    "facetData":facets.{
        "facetvalue":facet.name,
        "terms": [values.{
                    "term": value,
                    "count": quantity,
                    "productCount": quantity
                }]
    },
    "productsList": content.                 
     {                 
        "productId": id,                 
        "title": name,                 
        "price": {                     
            "amount":priceInfo.target.priceableFields.basePrice.amount,                     
            "currency": priceInfo.target.priceableFields.basePrice.currency                 
        },      
        "url": uri?uri:null,           
        "variants": [
            sku
        ],        
        "image": "https://192.168.15.43:8456"&(primaryAsset?primaryAsset[0].contentUrl :""),
         "size": "",                 
        "color": assets?assets[0].tags[0].$substringAfter(':'):"", 
        "seoUrl": slug?slug:"",
        "actions": {                     
            "compare": "Add to compare",                     
            "ideaBoard": "Add to Idea Board",                     
            "registry": "Add to Gift Registry",                     
            "quickView": "Quick view"                 
        },                 
        "badge": {                     
            "label": "Online Only",                     
            "priority": 1                 
        },               
        "options": {                     
            "color":[],                     
            "size":size?size:[]               
        },                 
        "attributes": "Special Product Alert!",                 
        "reviews": 12,                 
        "rating": 0.66             
    }          
} 
}`;
//-----------------------------------------------------------------------------
const SEARCH_WO_FACETS = `
{
  "data": content.{
     "title":name,
     "description":"description",
     "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
     "price":price.amount,
     "currency":price.currency,
     "skus":sku,
     "prodid":id,
     "productId":id,
     "productType":productType,
     "tax":"",
     "brand":brandDisplayValue,
     "L1category": primaryCategoryName ? primaryCategoryName: categoryNames[0],
     "desBoosted": desBoosted,
     "brandId":brandId
 }
 }`;
//-----------------------------------------------------------------------------
const SEARCH = `
{
  "data":{
    "totalItems":totalElements,
    "pagesize":pageable.pageSize,
    "productsList": [      
     content.{
     "title":name,
     "description":"description",
     "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
     "price":price.amount,
     "currency":price.currency,
     "skus":sku,
     "prodid":id,
     "productId":id,
     "productType":productType,
     "tax":"",
     "brand":brandDisplayValue,
     "L1category": primaryCategoryName ? primaryCategoryName: categoryNames[0],
     "desBoosted": desBoosted,
     "brandId":brandId
 }
    ],
"facetData": [
    $.facets
      .(
        {
          "facetvalue": facet.label,
          "terms":[
            values.{
            "term":value,
            "count":quantity,
            "productCount":quantity,
            "test":1
        }]
        }
      )
  ]   
    
  }
}
 `;
//-----------------------------------------------------------------------------
const NewArrival = `
{
  "data":{
    "productsList": [
     content.{
		  "productId":id,
		  "title":name,
		  "seoUrl": slug,
		  "variants":variants,
      "options":{
            "color": variants.color[0].value.en,
            "size": variants.size[0].value.en
        },
		  "actions": {
			  "compare": "Add to compare",
			  "ideaBoard": "Add to Idea Board",
			  "registry": "Add to Gift Registry",
			  "quickView": "Quick view"
		 },
		 "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
		 "price": {
			  "amount":priceInfo.target.priceableFields.basePrice.amount,
			  "currency":priceInfo.target.priceableFields.basePrice.currency
		 },
		 "basePrice": {
			  "amount":priceInfo.target.priceableFields.basePrice.amount,
			  "currency":priceInfo.target.priceableFields.basePrice.currency
		 },
		 "url": "#",
		 "badge": {
			  "label": "Online Only",
			  "priority": 1
			},
		 "attributes": ["Special Product Alert!", "Wedding Registry Favorite"],
		 "rating": 0.66,
		 "reviews": 12
		}
    ]    
  }
 }`;

//-----------------------------------------------------------------------------
const NewCommerce=`{
  "data":{
    "productsList": [
     content.{
		  "productId":id,
		  "title":name,
		  "seoUrl": slug,
		  "variants":variants,
      "options":{
            "color": variants.color[0].value.en,
            "size": variants.size[0].value.en
      },
		  "actions": {
			  "compare": "Add to compare",
			  "ideaBoard": "Add to Idea Board",
			  "registry": "Add to Gift Registry",
			  "quickView": "Quick view"
		 },
		 "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
		 "price": {
			  "amount":priceInfo.target.priceableFields.basePrice.amount,
			  "currency":priceInfo.target.priceableFields.basePrice.currency
		 },
		 "basePrice": {
			  "amount":priceInfo.target.priceableFields.basePrice.amount,
			  "currency":priceInfo.target.priceableFields.basePrice.currency
		 },
		 "url": "#",
		 "badge": {
			  "label": "Online Only",
			  "priority": 1
			},
		 "attributes": ["Special Product Alert!", "Wedding Registry Favorite"],
		 "rating": 0.66,
		 "reviews": 12
		}
    ]    
  }
 }`;

//-----------------------------------------------------------------------------

const PDP = `{              
    "data": {
    "options": [$map(products[0].options, function($option) {
            {
            "name": $lowercase($option.attributeChoice.attributeName),
            "values": [$map($option.attributeChoice.allowedValues, function($value) {
                $value.value
            })]
            }
        })],
 "colorData": (
    $colorOption := $filter(products[0].options, function($option) { 
        $lowercase($option.attributeChoice.attributeName) = "color" 
    })[0];
    $sizeOption := $filter(products[0].options, function($option) { 
        $lowercase($option.attributeChoice.attributeName) = "size" 
    })[0];
    $map(
        $sizeOption.attributeChoice.allowedValues,
        function($size, $index) {
            $colorOption.attributeChoice.allowedValues[$index] ? 
            { "data": [ $colorOption.attributeChoice.allowedValues[$index].value, $size.value ] } : 
            { "data": $size.value }
        }
    )
),
   "sizeData": (
    $colorOption := $filter(products[0].options, function($option) { 
        $lowercase($option.attributeChoice.attributeName) = "color" 
    })[0];
    $sizeOption := $filter(products[0].options, function($option) { 
        $lowercase($option.attributeChoice.attributeName) = "size" 
    })[0];
    $map(
        $sizeOption.attributeChoice.allowedValues,
        function($size, $index) {
            $colorOption.attributeChoice.allowedValues[$index] and $index = 0 ? 
            { "data": [ $size.value, $colorOption.attributeChoice.allowedValues[$index].value ] } : 
            { "data": $size.value }
        }
    )
),
  "productDetails":  products[0].{
    
      "bundleReview": {
        "numberOfReviews":  reviewsSummary.numberOfReviews
      },
      "specification": [
        {
          "articleNumberManufacturer": {
            "value": attributes.articleNumberManufacturer.value
          }
        }
      ],
      "availableOnline": availableOnline,
      "prodid": id,
      "defaultVariantId": variants[0].id,  
      "defaultSkuId": sku,
      "title": name,
      "subTitle": description,
      "price": priceInfo.price.amount,
      "defaultSalePrice": {
        "price":salePrice ?salePrice.amount :priceInfo.price.amount,
        "currency":priceInfo.price.currency
      },
      "currency":priceInfo.price.currency,
      "seoUrl":uri, 
      "categories": [parentCategories.{
                            "id": id,
                            "name": name,
                            "defaultcategory":name,
                            "url": url
                        }
      ], 
       "ratingsDistribution": {
                        "4": 2,
                        "5": 1
                    },
                    "totalRatings": 3,
                    "rating": 4.3
    },
    "seoJsonLD": {
        "product": {
            "offers": {
                "availability": products[0].active,
                "price": products[0].priceInfo.price.amount,
                "priceCurrency":products[0].priceInfo.price.currency,
                "@type": "Offer"
            },
            "name": products[0].name,
            "description": products[0].description,
            "image": products[0].primaryAsset[0].contentUrl,
            "url":products[0].uri,
            "brand": {
                "@type": "Brand"
            },
            "review": {
                "author": {
                    "@type": "Person"
                },
                "@type": "Review",
                "reviewRating": {
                    "bestRating": 5,
                    "worstRating": 0,
                    "@type": "Rating"
                }
            },
            "@type": "Product"
        }
    },
    "productType":products[0].productType,
    "productOverviewDetails": {
        "Overview": {
            "description": products[0].description
        },
        "Offers": {
            "description": "Offers on Product"
        },
        "Review": {
            "description": "Product Reviews"
        },
        "Returns": {
            "description": "Product Shipping and Returns"
        }
    },
    "imagesData": $map(products[0].primaryAsset, function($asset) {
    [{
      "image": "https://192.168.15.42:8456" & $asset.contentUrl,
      "text": "Image Text" 
    },{
      "image": "https://192.168.15.42:8456" & $asset.contentUrl,
      "text": "Image Text" 
    }
    ]
    }),
    "variants": [$map(products[0].variants, function($variant) {
        {
            "specification": [{}],
            "id": $variant.id,
            "sku": $variant.sku,
            "name": $variant.name,
            "imagesData": [$map(
            $filter(products[0].assets, function($asset) {
                $contains($lowercase($asset.tags[0]), "color:" & $lowercase($variant.optionValues.Color))
            }),
            function($asset) {
                {
                    "image": $asset.contentUrl
                }
            }
            )],
            "basePrice": {
                "price": $variant.priceInfo.target.priceableFields.basePrice.amount ,
                "currency": $variant.priceInfo.target.priceableFields.basePrice.currency 
            },
            "salePrice": {
                "price": $variant.priceInfo.target.priceableFields.basePrice.amount, 
                "currency":  $variant.priceInfo.target.priceableFields.basePrice.currency 
            },
            "optionValues": {
                "size": $variant.optionValues.Size,
                "hack":"this is color hack as broadleaf sending c C",
                "color": $variant.optionValues.Color?$variant.optionValues.Color:$variant.optionValues.color
              
            }
        }
    })],
    "designer":{
        "data": products[0].brand.value
    },
    "reviewRatingStatistics": {
        "totalRatings": 3,
        "averageRating": 4.3,
        "ratingsDistribution": {
            "4": 2,
            "5": 1
        }
    },
    "availableOnline": "true",
    "promoText": "(Save 10% with MILITARY STAR)",
    "actionsData": [
        "cart",
        "wishlist"
    ]
    }                  
}`;
//-----------------------------------------------------------------------------
const BestSellers = `
{
  "data":{
    "productsList": [
     content.{
      "productId":id,
      "actions": {
          "compare": "Add to compare",
          "ideaBoard": "Add to Idea Board",
          "registry": "Add to Gift Registry",
          "quickView": "Quick view"
        },
     "title":name,
     "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
     "price": {
          "normal":priceInfo.target.priceableFields.basePrice.amount,
          "low":priceInfo.target.priceableFields.basePrice.amount,
          "currency":priceInfo.target.priceableFields.basePrice.currency
        },
        "url": "#",
      "badge": {
          "label": "Online Only",
          "priority": 1
        },
        "attributes": ["Special Product Alert!", "Wedding Registry Favorite"],
        "rating": 0.66,
        "reviews": 12,
        "variants":variants,
        "inWishlist": "true",
        "brand":brandDisplayValue,
        "desBoosted": desBoosted ? ["Boosted By " & desBoosted] : "",
        "brandId":brandId
      }
    ]    
  }
 }`;
//-----------------------------------------------------------------------------
const FeaturedProduct = `
{
  "data":{
    "productsList": [
     content.{
      "productId":id,
     "title":name,
     "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
     "actions": {
          "compare": "Add to compare",
          "ideaBoard": "Add to Idea Board",
          "registry": "Add to Gift Registry",
          "quickView": "Quick view"
        },
     "price": {
          "amount":priceInfo.target.priceableFields.basePrice.amount,
          "currency":priceInfo.target.priceableFields.basePrice.currency
        },
      "seoUrl": slug,
      "badge": {
          "label": "Online Only",
          "priority": 1
        },
        "desBoosted": desBoosted,
        "attributes": ["Special Product Alert!", "Wedding Registry Favorite"],
        "rating": 0.66,
        "reviews": 12
      }
    ]    
  }
 }`;
//-----------------------------------------------------------------------------
const InspiredProducts = `
{
  "data":{
    "productsList": [
     content.{
      "productId":id,
      "actions": {
          "compare": "Add to compare",
          "ideaBoard": "Add to Idea Board",
          "registry": "Add to Gift Registry",
          "quickView": "Quick view"
        },
     "title":name,
     "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
     "price": {
          "normal":priceInfo.target.priceableFields.basePrice.amount,
          "low":priceInfo.target.priceableFields.basePrice.amount,
          "currency":priceInfo.target.priceableFields.basePrice.currency
        },
        "url": "#",
      "badge": {
          "label": "Online Only",
          "priority": 1
        },
        "attributes": ["Special Product Alert!", "Wedding Registry Favorite"],
        "rating": 0.66,
        "reviews": 12,
        "variants":variants,
        "inWishlist": "true",
        "brand":brandDisplayValue,
        "desBoosted": "Des Boosted",
        "brandId":brandId
      }
    ]    
  }
 }`;

//-----------------------------------------------------------------------------

const MenuTree = `
{
  "data":  [
      {
        "categories": [
            submenu.
          {
            "label": label,
            "link": url,
            "subcategories": [
                submenu.
              {
                "label": label,
                "link": url,
                "groups": [
                ]
              }
        ]
      }
    ]
  }
  ]
}
`;

const Footer = `
{
  "data":submenu.{
      "label":label,
      "link":url,
      "subcategories":submenu.{
         "label":label,
         "link":url
      }
  }   
 }
`;

const addLineItem = `
{
  "data": [
    {
          "cartId": id,
          "version": version,
          "totalLineItemQuantity": quantity
      }
  ]
}
`;

const login = `
{
  "data": {
    "authdetails":{
      "token_type":"Bearer",
      "access_token":token,
      "apiCookies":apiCookies
    }
  }
}
`;

const test = `{"data": setup}`;

const POSTLOGIN = `{
  "data": { 
    "access_token":access_token, 
    "expires_in":expires_in, 
    "customerid": customer_id,
    "firstname": full_name,
    "lastname": "",
    "tenant_id":tenant_id,
    "email": email_address,
    "user_name":email_address,
    "addresses": [],
     "itemShippingAddresses":[],
    "isEmailVerified": "",
    "totalLineItemQuantity": "",
    "cartDetails": {}
  }
}`;

//-----------------------------------------------------------------------------
const UPDATECUSTOMER = `
{
  "data": {
    "id": id,
    "email": email,
    "customerNumber": phone.phonenumber,
    "firstname": name,
    "lastname": "",
    "fullname":fullname
  }
}`;
const myorders = `{
  "data": {
    "orders": {
      "total": 91,
      "offset": 0,
      "count": 20,
      "results": [
       content.{
          "orderState": fulfillments[0].status,
          "orderDate": cartCreateDate,
          "orderId": fulfillments[0].orderId,
          "lineItems": [
            orderItems.{
              "images": imageAsset.contentUrl,
              "state": "Initial",
              "quantity": quantity,
              "name": name,
              "id": id,
              "price": {
                "value": {
                  "centAmount": unitPrice.amount,
                  "currencyCode": unitPrice.currency,
                  "fractionDigits": 2
                }
              },
              "productId": "c21d5fa2-28db-4574-90fc-fa99f8cc1fb5"
            }
           
          ]
        }
      ]
    }
  }
}
`;
const myordersdetails = `{

  "data": {
      "order": {
          "id": fulfillments[0].orderId,		
          "orderNumber": orderNumber,
          "customerEmail": emailAddress,
          "orderSubmittedDate": submitDate,
          "orderState": status,
    "shippingGroup" : [
      {
        "shippingMethod" : "Standard",
        "shippingAddress": fulfillments[0].address.{
          "firstName": fullName,
          "lastName": "",
          "addressLine1" : addressLine1,
          "addressLine2" : addressLine2,
          "city": city,
          "state": stateProvinceRegion,
          "country": country,
          "postalCode" : postalCode
        },
        "shippingPrice" : {
          "amount": "",
          "currency": "USD",
          "fractionDigits" : 2
        },
        "lineItems" : [
          orderItems.{

            "id": id,
            "state": status,
            "name": name,
            "variant": {
              "sku": sku,
              "images": imageAsset.contentUrl
            },
            "quantity": quantity,
            "price": {
                "amount": unitPrice.amount,
                "currency":unitPrice.currency,
                "fractionDigits" : 2
              }

            }
          
        ]
      }				
      
    ],
    "payment" : {
              "mode" : "Paid by visa ending with xxxx1234"
    },
    "billingAddress": {
              "firstName": "",
              "lastName": "",
              "addressLine1" : "",
              "addressLine2" : "",
              "city": "",
              "state": "",
              "country": "",
              "postalCode" : ""
          },

    
			"subtotal": {
        "amount": "",
        "currency": orderItems[0].subtotal.currency,
        "fractionDigits" : 2

    },
"discountPrice" : {	
  "amount": orderPricing.adjustmentsTotal.amount,
  "currency": orderPricing.adjustmentsTotal.currency,
  "fractionDigits" : 2

},
"taxes": {
        "amount": "",
        "currency": orderPricing.fulfillmentTotal.currency,
        "fractionDigits" : 2

    },
"totalShippingPrice": {
  "amount": orderPricing.fulfillmentTotal.amount,
  "currency": orderPricing.fulfillmentTotal.currency,
  "fractionDigits" : 2

    },
"totalPrice": {
        "amount": orderPricing.total.amount,
        "currency": orderPricing.total.currency,
        "fractionDigits" : 2

    }

      }

  }

}`;


const autoSuggest = `{
            "data": {
                "results": [
                   suggestions. products.{
                        "id": id,
                        "name": name,
                        "image": "https://192.168.15.43:8456"&primaryAssetContentUrl
                    }
                ]
            }
        }`;

const FETCHUSERADDRESSES = `{
    "data":{
        "addresses": [
        content.{
          "title": name,
          "salutation": "",
          "firstName": fullName,
          "lastName": "",       
          "additionalStreetInfo": "",
          "postalCode": postalCode,
          "city": city,
          "region": "",
          "state": stateProvinceRegion,
          "country": country,
          "company": "",
          "department": "",
          "building": "",
          "apartment": addressLine1,
          "phone":phoneSecondary.phoneNumber,
          "mobile": phonePrimary.phoneNumber,
          "email": customerRef.email,
          "fax": phoneFax.phoneNumber,
          "additionalAddressInfo": "",
          "externalId": "",
          "key": customerRef.id,
          "defaultAddress":defaultShippingAddress
        }
      ]
    } 
  }`;

const resolvecart = `
{
  "data" : 
  {
  "cartId": id,
  "name": name,
  "status": status,
  "customerRef": customerRef.{
      "customerId": customerId,
      "username": username,
      "fullName": fullName,
      "accountId": accountId,
      "registered": true
  },
  "emailAddress": emailAddress,
  "orderNumber": orderNumber,
  "createDate":createDate,
  "submitDate": submitDate,
  "locale": locale,
  "cartPricing": cartPricing.{
      "currency": currency,
      "totalTax": totalTax,
      "fulfillmentTotal": fulfillmentTotal{
          "amount": amount,
          "currency": currency
      },
      "subtotal": subtotal.{
          "amount": amount,
          "currency": currency
      },
      "adjustmentsTotal": adjustmentsTotal.{
          "amount": amount,
          "currency": currency
      },
      "total": total.{
          "amount": amount,
          "currency": currency
      },
      "feesTotal": feesTotal.{
          "amount":amount,
          "currency": currency
      },
      "taxIncludedType": taxIncludedType,
      "includedTaxAmount": includedTaxAmount.{
          "amount": amount,
          "currency": currency
      }
  },
  "cartItems": [
      cartItems.{
          "id": id,
          "name": name,
          "uri": uri,
          "quantity": quantity,
          "dependentCartItems": dependentCartItems,
          "dependentItemDetails": dependentItemDetails,
          "overridePriceFlag": overridePriceFlag,
          "priceListId": priceListId,
          "unitPrice": unitPrice{
              "amount": amount,
              "currency": currency
          },
          "unitPriceType": unitPriceType,
          "adjustmentsTotal": adjustmentsTotal.{
              "amount": amount,
              "currency": currency
          },
          "subtotal": subtotal.{
              "amount": amount,
              "currency": currency
          },
          "total": total.{
              "amount": amount,
              "currency": currency
          },
          "variantId": variantId,
          "productId": productId,
          "sku": sku,
          "imageAsset": imageAsset.{
              "contentUrl": contentUrl,
              "altText": altText,
              "title": title
          },
          "discountable": discountable,
          "taxable": taxable,
          "cartVersion": cartVersion
      }
  ]
}
}
`;
const moveToBilling = `{
  "data": 
    {
     "id": id,
     "shippingDetails": {
        "refNo": fulfillmentGroups.referenceNumber,
        "firstName": fulfillmentGroups.address.firstName,
        "streetNumber": fulfillmentGroups.address.addressLine1,
        "streetName": "",
        "city": fulfillmentGroups.address.city,
        "state": fulfillmentGroups.address.stateProvinceRegion,
        "country": fulfillmentGroups.address.country,
        "postalCode": fulfillmentGroups.address.postalCode,
        "phone": " ",
        "shippingMethodName": "FIXED_STANDARD",
        "amount": cartPricing.total.amount/100,
        "currency": cartPricing.total.currency
       },
      "version": version
    }
}`;
const processCheckout = `{
  "data": 
   {  
      "cartDetails": {
        "cartId": cart.id,
        "version": cart.version
        },                
        "status": cart.status,
        "email":cart.emailAddress,
        "orderNumber": cart.orderNumber,
        "createDate": cart.createDate,
        "orderSubmittedDate": cart.submitDate,
        "customerId": cart.customerRef.customerId,
        "name": cart.customerRef.fullName,
        "locale": cart.locale,
        "cartPriceDetails": {
            "currency": cart.cartPricing.currency,
            "totalTax": cart.cartPricing.totalTax
        },
        "shippingInfo": cart.cartPricing.fulfillmentTotal.amount,
        "totalBeforeDiscount": cart.cartPricing.subtotal.amount,
        "totalPrice": cart.cartPricing.total{
           "centAmount": amount,
           "currencyCode": currency
        },
    "lineItems": cart.cartItems.{
    "itemId": id,
    "name": name,
    "quantity": quantity,
    "productId": productId,
    "price": {
      "amount": unitPrice.amount,
      "currency": unitPrice.currency
    },
    "totalPrice": {
      "amount": total.amount,
      "currency": total.currency
    },
    "variant": {
      "sku": sku,
      "id": variantId,
      "imageUrl": imageAsset.contentUrl
    }
  },
    "shippingAddress": {
    "fullName": cart.fulfillmentGroups[0].address.fullName,
    "addressLine1": cart.fulfillmentGroups[0].address.addressLine1,
    "addressLine2": cart.fulfillmentGroups[0].address.addressLine2,
    "city": cart.fulfillmentGroups[0].address.city,
    "country": cart.fulfillmentGroups[0].address.country,
    "state": cart.fulfillmentGroups[0].address.stateProvinceRegion,
    "postalCode": cart.fulfillmentGroups[0].address.postalCode
  },
  "payments": paymentSummaries{
    "gateway": gatewayType,
    "paymethod": 'VISA'
  }
}
}`;
const orderDetails = `{
  "data": 
{
"order":{
 "id": id,
 "orderNumber": orderNumber,
 "orderSubmittedDate": submitDate,
 "orderState": status,
 "customerEmail": emailAddress,
 "subTotal": orderPricing.subtotal,
 "totalPrice": orderPricing.total,
  "taxes": orderPricing.totalTax,
  "totalShippingPrice": orderPricing.fulfillmentTotal,
  "discountOnTotalPrice": orderPricing.adjustmentsTotal,
  "cardNum": "***1111",
  "paymentMethod": "VISA",
  "brandName": "Credit Card",
  "billingAddress": fulfillments.address.{
             "firstName": fullName,
            "addressLine1": addressLine1,
            "addressLine2": addressLine2,
            "city": city,
            "state": stateProvinceRegion,
            "country": country,
            "postalCode": postalCode,
            "lastName": "Doe"
          },
  "shippingGroup": [{
     "lineItems": [
            {
              "state": fulfillments.status,
              "id": orderItems.id,
              "variant": orderItems.{
                "images": imageAsset.contentUrl,
                "size": attributeChoices.Size.value,
                "color": attributeChoices.Color.value,
                "sku": sku
              },
              "name": orderItems.name,
              "quantity": orderItems.quantity,
              "totalPrice": orderItems.total,
              "includedDiscounts": orderItems.itemAdjustments
            }
          ],
          "shippingMethod": fulfillmentOption.description,
          "shippingAddress": fulfillments.address.{
             "firstName": fullName,
            "addressLine1": addressLine1,
            "addressLine2": addressLine2,
            "city": city,
            "state": stateProvinceRegion,
            "country": country,
            "postalCode": postalCode
          },
          "shippingPrice": fulfillmentTotal
  }]
}
}
}`;
const updateLineItem = `{
  "data": 
   {
    "data": [
            {
            "cartId": id,
            "version": version,
            "lineItems": cartItems.[{
                "id": id,
                "quantity": quantity,
                "productId": productId,
                "name": name,
                "price": unitPrice.amount
            }],
            "totalPrice": {
                "currencyCode": cartPricing.total.currency,
                "centAmount":  cartPricing.total.amount
             },
            "totalLineItemQuantity": quantity
        }
        ]
  }
}`;
const address = `{
  "data": 
   {
      "response": {
      "data": {
      "addresses": content
      }
    }
  }
}`;
const removeAddressAction = `{
  "data": 
   {
    "reason": reason
   }
}`;
const createPayment = `{
  "data": 
    {
    "paymentId": paymentId,
    "name": name,
    "paymentMethod": type,
    "gatewayType": gatewayType,
    "amount": amount,
    "currency": currency,
    "version": version
  }
}`;
const addToCart = `{
  "data": 
    {
     "cartId": id,
     "version": version,
     "totalLineItemQuantity": quantity
    }
}`;
const viewCart = `{
  "data":
     {
      "cartId": id,
      "customerId": customerRef.customerId,
      "paymentSummary": {"paymentId":paymentSummary.content.paymentId},
      "cartState": status,
      "version":version,
      "lineItems": [
        cartItems.{
         "size": attributeChoices.Size.value,
         "color": attributeChoices.Color.value,
          "id": id,
          "productId": productId,
          "name": name,
          "variantId":variantId,
          "images": imageAsset.contentUrl,
          "price": unitPrice.amount,
          "totalItemPrice": subtotal.amount,
          "quantity": quantity,
          "discountPrice": total.amount,
          "itemAdjustments": itemAdjustments,
          "proratedOrderOfferAdjustments": proratedOrderOfferAdjustments
        }
      ],
      "totalPrice": {
      "centAmount": cartPricing.total.amount,
      "currencyCode": cartPricing.currency
      },
      "subTotal": cartPricing.subtotal,
      "shippingRate": {
          "centAmount": cartPricing.fulfillmentTotal.amount,
          "currency": cartPricing.fulfillmentTotal.currency
      },
      "discountOnTotalPrice": { 
          "discountedAmount":{
          "centAmount": cartPricing.adjustmentsTotal.amount,
          "currency": cartPricing.adjustmentsTotal.currency
          }
          },
      "shippingMode": fulfillmentGroups.type,
      "fulfillmentItemsSubtotal": fulfillmentGroups.fulfillmentItemsSubtotal,
      "totalTax":cartPricing.totalTax,
     "totalLineItemQuantity": quantity,
     "orderAdjustments": adjustments,
      "type": "Cart",
      "country": "US",
      "shipping": [],
      "itemShippingAddresses": []
    }
}`;

const ADDNEWADDRESS = `{
    "data":{
        "addresses": [
        {
          "title": fullName,
          "salutation": "",
          "firstName": fullName,
          "lastName": "",       
          "additionalStreetInfo": "",
          "postalCode": postalCode,
          "city": city,
          "region": "",
          "state": stateProvinceRegion,
          "country": country,
          "company": "",
          "department": "",
          "building": "",
          "apartment": addressLine1,
          "phone":phoneSecondary.phoneNumber,
          "mobile": phonePrimary.phoneNumber,
          "email": customerRef.email,
          "fax": phoneFax.phoneNumber,
          "additionalAddressInfo": "",
          "externalId": "",
          "key": customerRef.id,
          "defaultAddress":defaultShippingAddress
        }
      ]
    } 
  }`;
const removeLineItem = `{
  "data" :
    {
    "cartId": id,
    "version": version,
    "totalLineItemQuantity": quantity
  }
}`;

const setShippingAddress = `
{
  "fulfillmentGroups": fulfillmentGroups.{
    "referenceNumber": referenceNumber
  }
}
`;

const UPDATEADDRESS = `{
  "data":{
        "addresses": [
        {
          "title": fullName,
          "salutation": "",
          "firstName": fullName,
          "lastName": "",       
          "additionalStreetInfo": "",
          "postalCode": postalCode,
          "city": city,
          "region": "",
          "state": stateProvinceRegion,
          "country": country,
          "company": "",
          "department": "",
          "building": "",
          "apartment": addressLine1,
          "phone":phoneSecondary.phoneNumber,
          "mobile": phonePrimary.phoneNumber,
          "email": customerRef.email,
          "fax": phoneFax.phoneNumber,
          "additionalAddressInfo": "",
          "externalId": "",
          "key": customerRef.id,
          "defaultAddress":defaultShippingAddress
        }
      ]
    } 
}`;

const REMOVEADDRESS = `{
  "data":{
      "id": id
    } 
}`;

const SIGNUP = `{
  "data":{
    "id":id
  }
}`;

const getWishlistId = `
{
  "data": 
    content.{
      "userWishlistId": id
    }
  
}
`;

const addToWishlist = `
{
  "data": 
  content.{
      "wishlistId": "01H07HM41W6QJW164283980ARS",
      "name" : "My wishlist",
      "version": 3,
      "lineItems": [
          {
              "id": id,
              "productId": itemSkuRef.productId
          }
      ],
      "message": "Added to wishlist"
    }
}
`;

const removeItemFromWishlist = `
{
  "data" : 
  {
  "cartId": id,
  "name": name,
  "status": status,
  "customerRef": customerRef.{
      "customerId": customerId,
      "username": username,
      "fullName": fullName,
      "accountId": accountId,
      "registered": true
  },
  "emailAddress": emailAddress,
  "orderNumber": orderNumber,
  "createDate":createDate,
  "submitDate": submitDate,
  "locale": locale,
  "cartPricing": cartPricing.{
      "currency": currency,
      "totalTax": totalTax,
      "fulfillmentTotal": fulfillmentTotal{
          "amount": amount,
          "currency": currency
      },
      "subtotal": subtotal.{
          "amount": amount,
          "currency": currency
      },
      "adjustmentsTotal": adjustmentsTotal.{
          "amount": amount,
          "currency": currency
      },
      "total": total.{
          "amount": amount,
          "currency": currency
      },
      "feesTotal": feesTotal.{
          "amount":amount,
          "currency": currency
      },
      "taxIncludedType": taxIncludedType,
      "includedTaxAmount": includedTaxAmount.{
          "amount": amount,
          "currency": currency
      }
  },
  "cartItems": [
      cartItems.{
          "id": id,
          "name": name,
          "uri": uri,
          "quantity": quantity,
          "dependentCartItems": dependentCartItems,
          "dependentItemDetails": dependentItemDetails,
          "overridePriceFlag": overridePriceFlag,
          "priceListId": priceListId,
          "unitPrice": unitPrice{
              "amount": amount,
              "currency": currency
          },
          "unitPriceType": unitPriceType,
          "adjustmentsTotal": adjustmentsTotal.{
              "amount": amount,
              "currency": currency
          },
          "subtotal": subtotal.{
              "amount": amount,
              "currency": currency
          },
          "total": total.{
              "amount": amount,
              "currency": currency
          },
          "variantId": variantId,
          "productId": productId,
          "sku": sku,
          "imageAsset": imageAsset.{
              "contentUrl": contentUrl,
              "altText": altText,
              "title": title
          },
          "discountable": discountable,
          "taxable": taxable,
          "cartVersion": cartVersion
      }
  ]
}
}`;

const wishlists = `{
  "total": numberOfElements,
  "data": [
    content.{
      "name": name,
      "value" : id,
      "wishlistId": id,
      "version": 2,
      "customerId": "0031a25a-4e14-4efe-b7e1-a67d58f0e7aa"
    }
  ]
}
`;
//--------------------------------------------------------------------------------------------------
const PrimeDeals = `
{
  "data":{
    "productsList": [
     content.{
      "productId":id,
      "actions": {
          "compare": "Add to compare",
          "ideaBoard": "Add to Idea Board",
          "registry": "Add to Gift Registry",
          "quickView": "Quick view"
        },
     "title":name,
     "image":"https://192.168.15.236:8456" & assets[0].contentUrl,
     "price": {
          "normal":priceInfo.target.priceableFields.basePrice.amount,
          "low":priceInfo.target.priceableFields.basePrice.amount,
          "currency":priceInfo.target.priceableFields.basePrice.currency
        },
        "url": "#",
      "badge": {
          "label": "Online Only",
          "priority": 1
        },
        "attributes": ["Special Product Alert!", "Wedding Registry Favorite"],
        "rating": 0.66,
        "reviews": 12,
        "variants":variants,
        "inWishlist": "true",
        "brand":brandDisplayValue,
        "desBoosted": "Des Boosted",
        "brandId":brandId
      }
    ]    
  }
 }`;
 //------------------------------------------------------------------------------------
 const GenericTransformer = `
{
            "data": {
                "totalItems": totalElements,
                "productsList": [
                    content.{
                        "productId": id,
                        "title": name,
                        "price" : priceInfo.target.priceableFields.{
                            "amount": basePrice.amount,
                            "currency": basePrice.currency
                        },
                        "url": uri,
                        "variants": [
                            sku
                        ],
                        "image": "https://192.168.15.43:8456"&primaryAsset.contentUrl,
                        "actions": {
                            "compare": "Addtocompare",
                            "ideaBoard": "AddtoIdeaBoard",
                            "registry": "AddtoGiftRegistry",
                            "quickView": "Quickview"
                        },
                        "seoUrl": "",
                        "badge": {
                            "label": "OnlineOnly",
                            "priority": 1
                        },
                        "attributes": "SpecialProductAlert!",
                        "rating": 0.66,
                        "reviews": 12
                    }]}}`;
 //------------------------------------------------------------------------------------
 const TopCategories=` {
            "data": {
                "categories": [
                    submenu.{
                        "uiId": id?id:"",
                        "name": label?label:"",
                        "catName":  label?label:"",
                        "alt": label?label:"",
                        "uiimage": imageUrl?imageUrl:"",
                        "uitype": "MainCategory",
                        "uri": 'categoryName='&label&'&searchedTerm='&id
                    }
                ]
            }
        }`
//----------------------------------------------------------------------------------------------
const TopDeals = `
{
  "data":{
    "total": totalElements,
    "productsList": [
     content.  {
                "productId": id,
                "title": name,
                "price" : priceInfo.target.priceableFields.{
                            "amount": basePrice.amount,
                            "currency": basePrice.currency
                        },
                "url":uri,
                "image": "https://192.168.15.43:8456"&primaryAsset.contentUrl,
                "variants": [sku],
                "actions": {
		          "compare": "Addtocompare",
		          "ideaBoard": "AddtoIdeaBoard",
		          "registry": "AddtoGiftRegistry",
		          "quickView": "Quickview"
		        },
                "seoUrl":slug?slug:"",
		        "badge": {
		          "label": "OnlineOnly",
		          "priority": 1
		        },
		        "attributes": "SpecialProductAlert!", 
		        "rating": 0.66,
		        "reviews": 12
        }]
    }
}`
 //-----------------------------------------------------------------------------------------------
 const recommendedProductSpecificAttributes=`
 {     "data":        
          data.product.{             
            "id": id,             
            "name": masterData.current.name,             
            "description":masterData.current.description,             
            "image":masterData.current.masterVariant.images[0].url,             
            "variant":{                 
                "id":masterData.current.masterVariant.id,                 
                "price":masterData.current.masterVariant.price             
              }         
          }      
}`
 //---------------------------------------------------------------------------------------------
 const menu=`
 {
  "data": {
    "categories": submenu.(
      $parentId := id;
      $parentLabel := label;
      {
        "id": $parentId,
        "label": $parentLabel,
        "link": url,
        "assets": imageUrl,
        "count": 1,
        "subcategories": submenu.(
          $subParentId := id;
          $subParentLabel := label;
          {
            "id": imageAltText,
            "assets": imageUrl,
            "label": $subParentLabel,
            "link": url,
            "count": displayOrder,
            "groups": [submenu.{
              "id": id,
              "assets": imageUrl,
              "label": label,
              "link": url,
              "parent_name": $subParentLabel,
              "parent_id": $subParentId
            }],
            "parent_name": $parentLabel,
            "parent_id": $parentId
          }
        )
      }
    )
  }
}
`
//---------------------------------------------------------------------------
const createWishlist=`{
  "data": {
      "response": {
          "data": content.{
              "id": id,
              "name": name
          }
      }
  }
}`
//----------------------------------------------------------------------
const viewWishlist=`
{
            "data": {
                "response": {
                    "total": numberOfElements,
                    "data": [
                        content.{
                            "wishlistId": id,
                            "value": id,
                            "name": name,
                            "lineItems": [
                                items.{
                                    "id": id,
                                    "quantity": quantity,
                                    "price": price.{
                                        "amount": price.amount?amount:null,
                                        "currency": "USD"
                                    },
                                    "images": images?images:null,
                                    "name": name?name:null,
                                    "productId": itemSkuRef.productId,
                                    "sku":itemSkuRef.sku
                                }
                            ],
                            "customerId": null,
                            "version": null
                        }]}}}
`
//---------------------------------------------------------------------------------------------------------
const jsonBLMapData = {
  getCustomerByEmail: getCustomerByEmail,
  pdp: PDP,
  plp: PLP,
  HOME: PLP,
  SEARCH: SEARCH,
  BestSellers: GenericTransformer,
  InspiredProducts: InspiredProducts,
  NewArrival: GenericTransformer,
  NewCommerce:GenericTransformer,
  FeaturedProduct: GenericTransformer,
  MenuTree: MenuTree,
  menu: menu,
  FOOTER: Footer,
  TopDeals: TopDeals,
  login: login,
  test: test,
  POSTLOGIN: POSTLOGIN,
  UPDATECUSTOMER: UPDATECUSTOMER,
  myorders: myorders,
  autoSuggestion: autoSuggest,
  FETCHUSERADDRESSES: FETCHUSERADDRESSES,
  resolvecart: resolvecart,
  moveToBilling: moveToBilling,
  processCheckout: processCheckout,
  orderDetails: orderDetails,
  updateLineItem: updateLineItem,
  address: address,
  removeAddressAction: removeAddressAction,
  addToCart: addToCart,
  createPayment: createPayment,
  viewCart: viewCart,
  addLineItem: addLineItem,
  ADDNEWADDRESS: ADDNEWADDRESS,
  removeLineItem: removeLineItem,
  UPDATEADDRESS: UPDATEADDRESS,
  REMOVEADDRESS: REMOVEADDRESS,
  setShippingAddress: setShippingAddress,
  myordersdetails: myordersdetails,
  SIGNUP: SIGNUP,
  addToWishlist: addToWishlist,
  removeItemFromWishlist: removeItemFromWishlist,
  wishlists: wishlists,
  PrimeDeals:GenericTransformer,
  Recommend:GenericTransformer,
  UserRecommend:GenericTransformer,
  TopCategories:TopCategories,
  TopProducts:GenericTransformer,
  recommendedProductSpecificAttributes:recommendedProductSpecificAttributes,
  MostViewed:GenericTransformer,
  InspiredProducts:GenericTransformer,
  TrendingOnSocialMedia:GenericTransformer,
  createWishlist:createWishlist,
  viewWishlist:viewWishlist
};

module.exports = {
  jsonBLMapData
};
