const rp=require("request-promise");
const $=require("cheerio");
const fs=require("fs");
const req=require("request");
//var sayfano=1;

for(var sayfano=1;sayfano<15;sayfano++)
{
    var url="https://www.hepsiburada.com/xiaomi-redmi-note-8-pro-64-gb-xiaomi-turkiye-garantili-p-HBV00000NB888-yorumlari?sayfa="+sayfano;
    rp(url)
    .then((html) => {
       
    for(var i=0;i<20;i++)
    { 
    var star=$("#reviews > li > div.reviewRating > div.ratings-container > div > div",html)[i].attribs.style

     if (star=="width: 20%" || star=="width: 40%"||star=="width: 60%")
    {
        star=0
    }
    else if(star=="width: 80%"||star=="width: 100%")
    {
        star=1
    }
    
    
    var comment=$("#reviews > li > div.review > p",html)[i].firstChild.data
    
    
field=({
    star:star,
    comment:comment,
    
})

     fs.appendFile("yorumlar.csv",comment+"|"+star+"\n",function(error)
     {
     console.log("yazıldı")
    
     })
    
    
    }
    
    })
}




function Yıldızsay(Style)
{
    switch (Style)
    {
        case "width: 20%":
            console.log(0);
            break;
            case "width: 40%":
                console.log(0);
                break;
                case "width: 60%":
                    console.log(0);
                    break;
                    case "width: 80%":
                        console.log(1);
                        break;
                        case "width: 100%":
                            console.log(1);
                            break;
                            default:
                            break;
    
    }
}