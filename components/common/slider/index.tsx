/* eslint-disable @next/next/no-img-element */
"use client"; // this is a client component 

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/pagination";
import styles from "./slider.module.scss";
import { BsHeart } from "react-icons/bs"
import { GoVerified } from "react-icons/go"
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/core";
import Link from "next/link";
import Image from "next/image";
SwiperCore.use([EffectCoverflow, Pagination, Navigation]);


const CommonSlider = ({ Data }: any) => {

  return (
    <div className={styles.sliderContainer}>
      <Swiper
        navigation={true}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={2}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {Data?.map((item: any, index: number) => {
          return (
            <SwiperSlide key={index}>
              <div className={styles.card}>
                <div className={styles.header} style={{
                  backgroundImage: `url(${item.src})`,
                }}>
                  <div className={styles.text}>
                    <label>
                      <GoVerified className="font-bold text-[15px]" /> Verified
                    </label>
                  </div>
                  <div className={styles.heart}>
                    <BsHeart className={styles.icon} />
                  </div>
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.heading}>
                    <div className={styles.left}>
                      8 Crore
                    </div>
                    <Link href="/live-auction/8-crore" className={styles.btn}>
                      Place you Bid
                    </Link>
                  </div>
                  <div className={styles.address}>
                    DHA Phase 6, DHA Defense
                  </div>
                  <div className={styles.size}>
                    <div className={styles.sizeOne}>
                      <Image src="/icons/icon-bed.svg" width={19} height={15} alt="icon-bed" />
                      <label>
                        5
                      </label>
                    </div>
                    <div className={styles.sizeTwo}>
                      <Image src="/icons/Frames.svg" width={19} height={15} alt="icon-frame" />
                      <label>
                        5
                      </label>
                    </div>
                    <div className={styles.sizeIcon}>
                      <Image src="/icons/areaMeasurements.svg" width={20} height={20} alt="icon-bed" />
                    </div>
                    <div className={styles.sizeFrom}>
                      From 1100 sqft
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CommonSlider;
