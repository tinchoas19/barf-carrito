import Banner from '@/components/banners/banner';
import PromotionSliders from '@/components/promotions/promotions';
import Categories from '@/components/categories/categories';
import { Element } from 'react-scroll';
import FilterBar from './filter-bar';
import ProductGridHome from '@/components/products/grids/home';
import type { HomePageProps } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useSettings } from '@/framework/settings';
import Cookies from 'js-cookie';

export default function ClassicLayout({ variables }: HomePageProps) {
 
  const [showSlider, setShowSlider] = useState(false)

  const {
    settings: { mensajehome },
  } = useSettings();


  useEffect(() => {
    console.log(mensajehome)
    if(mensajehome.activo == "1" && Cookies.get("alert") != "ok") {
      var now = new Date();
      now.setTime(now.getTime() + 1 * 3600 * 1000);
      let expireTimeStamp = parseInt((now.getTime() / 1000).toString());
      Cookies.set("alert", "ok", { expires: expireTimeStamp });
     
      window.alert(mensajehome.mensaje);
  }
    setTimeout(() => {
      setShowSlider(true)
    },500)
  },[]) 

  return (
    <>
    
      <Banner layout="classic" variables={variables.types} />
      {showSlider && <PromotionSliders variables={variables.types} />}
      
      <FilterBar variables={variables.categories} />
      
      <Element
        name="grid"
        className="flex border-t border-solid border-border-200 border-opacity-70"
      >
        <Categories layout="classic" variables={variables.categories} />
        <ProductGridHome
          className="px-4 pb-8 lg:p-8"
          variables={variables.products}
        />
      </Element>
    </>
  );
}
