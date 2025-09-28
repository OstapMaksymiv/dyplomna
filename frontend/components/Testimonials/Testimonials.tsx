import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { advert, reviews } from "@/constants";
import Image from "next/image";
import "./testimonials.css";
import { Caveat } from "next/font/google";
const caveat = Caveat({
  subsets: ["latin"],
});
const Testimonials = () => {
  return (
    <section className="flex flex-col py-8">
      <div className="flex items-center gap-2.5 justify-between text_change">
        <h2 className="text-2xl font-semibold">Reviews</h2>{" "}
        <span>See it all {"↴"}</span>
      </div>
      <div className="flex flex-col items-center gap-9">
        <h3 className="tracking-[-0.02em] leading-[1.4em] text-center text-[rgb(153,153,153)] font-semibold">
          Who team up with us:
        </h3>
        <Swiper
          className="swiperADW swiper-s"
          spaceBetween={20}
          slidesPerView={2.5}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          allowTouchMove={false}
          keyboard={{ enabled: false }}
          speed={5000}
          pagination={false}
          navigation={false}
          modules={[Autoplay]}
        >
          {advert.map((adv, id) => (
            <SwiperSlide
              key={id}
              className={`${caveat.className}   text_change`}
            >
              <Image src={`/c_${id + 1}.png`} alt="" width={40} height={40} />
              {adv}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="reviews">
          {reviews.map((review, id) => (
            <div key={id} className="review ">
              <div className="flex flex-col gap-3">
                <div className="review_person ">
                  <Image
                    width={24}
                    height={24}
                    src={review.avatar}
                    alt={review.name}
                  />
                  <h4>{review.name}</h4>
                </div>
                <div className="flex ">
                  {[...Array(review.stars)].map((_, index) => (
                    <Image
                      key={index}
                      src="/star.png"
                      width={14}
                      height={14}
                      alt="star"
                    />
                  ))}
                </div>
              </div>
              <p
                className="review_text"
                dangerouslySetInnerHTML={{
                  __html: review.text.replace(
                    /Budgix/g,
                    '<span style="color:white" class="budgix">Budgix</span>'
                  ),
                }}
              ></p>
              <p className="template-date">
                {review.source} • <span>{review.date}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
