"use client"
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react'
import styles from "./myApartment.module.scss"
import { FiShare2 } from "react-icons/fi"
import { AiOutlineHeart } from "react-icons/ai"
import { HiLocationMarker } from "react-icons/hi"
import { BiUser } from "react-icons/bi"
import Image from 'next/image'
import DeleteAndConfirmMyBid from '../../common/popups/deleteMybid'
import { useRouter } from 'next/navigation'
import { staticData } from './Data'
import useDebounce from './useDebounce'
import { HTTP_CLIENT } from '../../../utils/axiosClient'

const MyApartments = () => {
  
  // console.log("staticData",staticData)

  
  const [activeImage, setActiveImage] = useState<any>({
    imgSrc: "/background-images/buildings.png",
    activeIndex: 0,
  });
  const [searchText, setSearchText] = useState("");
  const[findIndex,setFindIndex]=useState("")
  const [less, setLess] = useState(true);
  const[loading,setLoading]=useState(false)
  const[searchData,setSearchData]=useState<any>([])
  const debouncedValue = useDebounce<string>(searchText, 5000)

  const seeMore = (index) => {
    setFindIndex(index)
    setLess(false);
  };
  const seeLess = (index) => {
    setFindIndex(index)
    setLess(true);
  };

  const handleSearchResult = async () => {
    try {
      setLoading(true)
      const { data } = await HTTP_CLIENT.get(`/km/search/?query=${searchText.toLowerCase()}`)
      
      // console.log("🚀 ~ handleSearchResult ~ data:", data?.data["hits.hits"])
      setSearchData(data?.data["hits.hits"])
      setLoading(false)
      // console.log("🚀 ~ handleSearchResult ~ data:", data)
    } catch (error) {
      setLoading(false)
      // console.log("🚀 ~ handleSearchResult ~ error:", error)
      
    }
  }


  useEffect(() => {
    handleSearchResult();
  }, [debouncedValue]);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headingAndHistory}>
          <div className={styles.mainHeading}>Property Search</div>
          <div className={styles.historyBtn}>
            <input type="search" onChange={(e)=>setSearchText(e.target.value)} value={searchText} placeholder='Search here...'/>
            <button onClick={()=>handleSearchResult()}>Search</button>
          </div>
        </div>
        {loading ? "Loading...." :
        <div className={styles.cards}>
          {searchData.map((item, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.leftWrapper}>
                <div className={styles.productGalleryWrapper}>
                  <div className={styles.badgeAndGallery}>
                    <div className={styles.badge}>
                      <img src="/icons/badge.png" />
                      Super hot
                    </div>
                    <div className={styles.gallery}>
                      <img src="/icons/album.png" />
                      {item?._source?.images?.length}
                    </div>
                  </div>

                  <div className={styles.selectedImage}>
                    <img src={activeImage.imgSrc} alt="" />
                  </div>
                  <div className={styles.gallerySlider}>
                    {item?._source?.images?.map((item: string, index: number) => (
                      <div
                        className={
                          activeImage?.activeIndex === index
                            ? styles.activeimgWrapper
                            : styles.imgWrapper
                        }
                        key={index}
                        onClick={() =>
                          setActiveImage({
                            imgSrc: `https://pro-mls-portal.s3.amazonaws.com/${item}`,
                            activeIndex: index,
                          })
                        }
                      >
                        <img src={`https://pro-mls-portal.s3.amazonaws.com/${item}`} alt="icon" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.titleAndHeart}>
                  <div className={styles.title}>
                    {item?._source?.propertyType} {item?._source?.units[0]?.pricingHistory?.sales[0]?.price && <span>{`€${item?._source?.units[0]?.pricingHistory?.sales[0]?.price}`}</span> }
                  </div>
                  <div className={styles.shareAndHeart}>
                  <div className={styles.size}>
                <div className={styles.sizeOne}>
                  <Image src="/icons/whiteBed.svg" width={19} height={15} alt="icon-bed" />
                  <label>
                    {item?._source?.units[0]?.beds} bedroom
                  </label>
                </div>
                <div className={styles.sizeTwo}>
                  <Image src="/icons/whiteFrame.svg" width={19} height={15} alt="icon-frame" />
                  <label>
                    {item?._source?.units[0]?.baths} barthrooms
                  </label>
                </div>
                <div className={styles.sizeTwo}>
                  <Image src="/icons/area_size.svg" width={20} height={20} alt="icon-measurement" />
                  <label>
                    {item?._source?.floors} Floors
                  </label>
                </div>

              </div>
                  </div>

                </div>
                {/* <div className={styles.heading}>
                  <label>Demand:</label> {item?._source?.units[0]?.pricingHistory?.sales[0]?.price}
                </div> */}
                <div className={styles.address}>
                 {item?._source?.address}
                </div>
                <div className={styles.location}>
                  <HiLocationMarker /> {item?._source?.urbanisation}, {item?._source?.municipality},  {item?._source?.province},  {item?._source?.country},
                </div>
                <div className={styles.descriptionTitle}>Description</div>
                <div className={styles.description}>
                {item?._source?.description?.length > 570 ? (
                less ? (
                  <div className="cursor-pointer">
                    {item?._source?.description.substring(0, 570)}...
                    <span
                      className="underline ml-1 text-blue-500"
                      onClick={()=>seeMore(index)}
                    >
                      See More 
                    </span>
                  </div>
                ) :  (
                  <div className="cursor-pointer">
                    {item?._source?.description}
                    <span
                      className="underline ml-1 text-blue-500"
                      onClick={()=>seeLess(index)}
                    >
                      See Less
                    </span>
                  </div>
                )
              ) : (
               <>
               {item?._source?.description}
               </>
              
              )}
                </div>
                {/* <div className={styles.statusAndKilometer}>
                  <div className={styles.status}>Status</div>
                  <div className={styles.kilometer}>
                    <div className={styles.user}>
                      <BiUser className={styles.icon} />&nbsp;<span>7</span>
                    </div>
                    <div className={styles.price}>
                      PKR 2.7 M
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        }
      </div>
    </>
  )
}

export default MyApartments