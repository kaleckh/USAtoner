"use client"
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import BestSellers from "../components/BestSellers";
import AllOptions from "../components/AllOptions";
import Link from "next/link";
import styles from "../page.module.css";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";

export default function Data() {
  const [name, setName] = useState("");
  const [recaptchaResponse, setRecaptchaResponse] = useState(false);
  const [products, setProducts] = useState("");
  const [email, setEmail] = useState("");
  const [inputData, setInputData] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("this is the test message");
  const tawkMessengerRef = useRef();
  const captchaRef = useRef(null);
  const token = JSON.parse(localStorage.getItem("token"))


  const onLoad = () => {
    console.log("onLoad works!");
  };
  const handleMinimize = () => {
    tawkMessengerRef.current.minimize();
  };
  const router = useRouter();
  var verifyCallback = function (response) {
    setRecaptchaResponse(response);
  };


  async function search() {
    const requestOptions = {
      method: "POST",

      body:
        JSON.stringify({
          token: token.accessToken,
          search: inputData
        })

    }
    try {
      const response = await fetch('/api/products', requestOptions);
      const data1 = await response.json();
      console.log(data1.cancel.products, "this is the product response")
      setProducts(data1.cancel.products)
    } catch (err) {
    }
  }

  async function getProducts() {
    const requestOptions = {
      method: "POST",

      body:
        JSON.stringify({
          token: token.accessToken,
          search: "Brother"
        })

    }
    try {
      const response = await fetch('/api/products', requestOptions);
      const data1 = await response.json();
      console.log(data1.cancel.products, "this is the product response")
      setProducts(data1.cancel.products)
    } catch (err) {
    }
  }
  useEffect(() => {

    getProducts()
  }, [])

  // console.log(token)

  return (
    <div className={styles.main}>

      <Header />
      <div className={styles.secondSection}>
        <div className={styles.flexSomething}>
          <div className={styles.flex}>
            <div className={styles.mainContainer}>
              <div className={styles.buttonCenter}>
                <div className={styles.bubble}>
                  USA Toner
                </div>
              </div>
              <h1>
                <div className={styles.homepageTitle}>
                  Konica Toner Cartridges
                </div>
              </h1>
              <div className={styles.paragraphSmall}>
                We provide the highest quality Konica Minolta Toner cartidges
              </div>
              <div className={styles.buttonCenter}>
                <Link href={'/buy'}>
                  <button className={styles.buttonBlue}>Get A Quote Now</button>
                </Link>
              </div>
            </div>

            <div className={styles.displayNone}>
              <Image
                src="/static/Group.webp"
                alt="buy a used or new business copier"
                width={500}
                height={300}
              />
            </div>
          </div>
        </div>        
        <div className={styles.center}>
          <div className={styles.beginning}>
            <div className={styles.flexSmall}>
              <BestSellers />
              <input onChange={(event) => {
                setInputData(event.target.value)
              }} onKeyDown={(e) => {
                if (e.key === "Enter")
                  search()
              }} className={styles.search} placeholder="OEM or Name"></input>
            </div>
          </div>
          <div className={styles.boxContainer}>
            {products && <>

              {products?.map((toner) => {
                return (
                  <div
                    key={toner.oem}
                    // onClick={() => {
                    //   setCartLook({
                    //     name: toner.name,
                    //     oem: toner.oem,
                    //     price: toner.price,
                    //     color: toner.color,
                    //     photo: toner.image,
                    //     yield: toner.yield,
                    //   });
                    // }}
                    className={styles.box}
                  >

                    <Image
                      alt={'image of toner'}
                      style={{ borderRadius: "5px" }}
                      src={toner.images[0]}
                      width={180}
                      height={180}
                    ></Image>
                    <div className={styles.titleSmallBlack}>{toner.title}</div>
                    <div style={{ width: "100%" }}>
                      <div className={styles.row}>
                        <div className={styles.row}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{ paddingRight: "5px", color: "rgb(2,50,92)" }}
                              className={styles.price}
                            >
                              $
                            </div>
                            <div style={{ color: "rgb(2,50,92)" }} className={styles.modelSmallish}>
                              {toner.serviceLevels[0].price}
                            </div>
                          </div>
                        </div>
                        <div className={styles.row}>
                          <div
                            style={{ paddingRight: "5px" }}
                            className={styles.priceSmall}
                          >
                            OEM:
                          </div>
                          <div className={styles.modelSmall}>{toner.oemNos[0].oemNo}</div>
                        </div>
                      </div>
                      <div
                        style={{ paddingTop: "10px" }}
                        className={styles.rowOem}
                      >
                      </div>
                    </div>
                    <Link
                      onClick={() => {
                        setTonerOem(toner.oem)
                        localStorage.setItem("tonerOem", toner.oem)

                      }}
                      className={styles.somethingElse}
                      href={`/tonerChoice?oem=${toner.oem}`}
                    ></Link>
                    <div style={{ width: "85%" }} className={styles.row}>
                      <Link href={'/carts'}>
                        <button className={styles.buttonBlue} onClick={() => {
                          const updatedCart = [
                            ...cart,
                            {
                              name: toner.title,
                              oem: toner.oemNos[0].oemNo,
                              price: toner.serviceLevels[0].price,
                              quantity: 1,
                              image: toner.images[0],
                            },
                          ];
                          setCart(updatedCart)
                        }}>Add to cart</button>
                      </Link>
                      <Link href={'/carts'}>
                        <button style={{ backgroundColor: "rgb(131,208,130)" }} className={styles.buttonBlue} onClick={() => {
                          const updatedCart = [
                            ...cart,
                            {
                              name: toner.title,
                              oem: toner.oemNos[0].oemNo,
                              price: toner.serviceLevels[0].price,
                              quantity: 1,
                              image: toner.images[0],
                            },
                          ];
                          setCart(updatedCart)
                        }}>Add to cart</button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </>}
          </div>
        </div>
        <AllOptions />
      </div >
      <Footer />
    </div >
  );
}
