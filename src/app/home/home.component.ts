import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dummydata:any =[
    {itemname:'Classic Bruschetta',category:'Italian',price:'300',description:"Nothing screams summer quite like bruschetta. Toasted bread gets rubbed with garlic (don't skip it, it's the best part) and topped with simply marinated tomatoes. The brighter and juicier your tomatoes, the better your bruschetta will be.",veg:true,image:'https://foodorderingdocs.blob.core.windows.net/images/4001.jpg',ratings:'5'},
    {itemname:'Caprese Garlic Bread',category:'Italian',price:'390',description:"Caprese Garlic Bread is the best garlic bread twist! Not only is each slice of Caprese Garlic Bread smothered in Garlic Butter and broiled (or grilled) to crispy buttery-ness, there is also fresh, melted mozzarella cheese over the top. The perfect side dish to go with any type of dinner choice!",veg:true,image:'https://foodorderingdocs.blob.core.windows.net/images/4002.jpg',ratings:'3'},
    {itemname:'Pizza Quattro Stagioni',category:'Italian',price:'390',description:"A Pizza Quattro Stagioni, or four seasons pizza, is a classic Italian pizza prepared in four sections, with each section representing a different season of the year. This version of the classic Italian-influenced pizza is topped with marinated artichokes for spring, fresh Campari tomatoes and basil for summer, Cremini mushrooms for fall, and a salty and savory combo of prosciutto and Kalamata olives for winter.",veg:false,image:'https://foodorderingdocs.blob.core.windows.net/images/4005.jpg',ratings:'4'},
    {itemname:'Dragon Chicken',category:'North Indian',price:'270',description:"Dragon chicken is an Indian Chinese dish that combines Chinese cooking techniques with Indian flavors. Amazingly good and just perfect with rice. Dragon chicken is a spicy dish.",veg:false,image:'https://foodorderingdocs.blob.core.windows.net/images/5003.jpg',ratings:'4.5'},
    {itemname:'Paneer Biryani',category:'Indian',price:'450',description:"Paneer biryani is an Indian dish made with paneer, basmati rice, spices & herbs. This paneer biryani is unique, flavorful & amazingly delicious. Biryani is most commonly made with meat but this recipe uses paneer aka Indian cottage cheese.",veg:true,image:'https://foodorderingdocs.blob.core.windows.net/images/5011.jpg',ratings:'5'},

  ]
  customOptions: OwlOptions = {
    items: 1,
    loop: true,
    stagePadding: 0,
    margin: 0,
    autoplay: true,
    animateOut: 'slideOutDown',
    animateIn: 'fadeIn',
    nav: true,
    //navText: ['<button class="btn value="Prev"></button>', '<button class="btn value="Next"></button>']
  }
  constructor(private ser:LoginService){
  }
  
  ngOnInit(): void {
  }

}
