import Head from 'next/head';
import Header from '../../components/Header';
import HeaderCart from 'components/HeaderCart';
import HeaderOrder from 'components/HeaderOrder';
import HeaderLogin from 'components/HeaderLogin';
import HeaderLogout from 'components/HeaderLogout';
import useSWR, { useSWRConfig } from 'swr';
import Image from 'next/image';
import styles from '../../components/cart.module.css';
import Link from 'next/link';
import OrderItems from 'components/orderItemList';
import OrderConfirmation from '../orderConfirmation';
import React, { useState, useEffect } from 'react';
import HeaderLoginUserName from 'components/HeaderLoginUserName';

const fetcher = (resource: any, init: any) =>
  fetch(resource, init).then((res) => res.json());

export default function Cart() {
  const { data, error } = useSWR(
    'http://localhost:8000/orderItems',
    fetcher
  );

  const [testFlag, setTestFlag] = useState(false);
  const [hone, setHone] = useState(true);
  const [del, setDel] = useState(true);
  const [moji, setMoji] = useState(true);
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  let oder = () => {
    setTestFlag(!testFlag);
    setHone(!hone);
    setDel(!del);
    setMoji(!moji);
    returnTop();
  };

  const { mutate } = useSWRConfig();
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const onClickDelete = (id: number) => {
    fetch(`http://localhost:8000/orderItems/${id}`, {
      method: 'delete',
    });
    mutate('http://localhost:8000/orderItems');
  };

  //   const onClickDeleteT = (orderToppingList: string) => {
  //     {data.map((aaaaa: any) =>
  //       {aaaaa.map((orderToppingList: any) => {
  //     fetch(`http://localhost:8000/orderItems/${[orderToppingList}`, {
  //       method: 'delete',
  //     });
  //     mutate('http://localhost:8000/orderItems');
  //   }
  //     )
  // }
  //     )
  // }
  //   }

  let total: any = 0;

  return (
    <>
      <Head>
        <title>{hone ? '???????????????????????????' : '??????????????????'}</title>
      </Head>
      <Header
        menu5={<HeaderLoginUserName />}
        menu1={<HeaderCart />}
        menu2={<HeaderOrder />}
        menu3={<HeaderLogin />}
        menu4={<HeaderLogout />}
      />
      <div className={styles.all}>
        {data.length === 0 ? (
          <p className={styles.msg}>????????????????????????????????????</p>
        ) : (
          <>
            <h1>{hone ? '???????????????????????????' : '??????????????????'}</h1>

            <table className={styles.table}>
              <thead className={styles.th}>
                <tr className={styles.tr}>
                  <th className={styles.th}>?????????</th>
                  <th className={styles.th}>
                    ??????????????????(??????)?????????
                  </th>
                  <th className={styles.th}>
                    ????????????????????????????????????
                  </th>
                  <th className={styles.th}>??????</th>
                </tr>
              </thead>

              {data.map((orderItems: any) => {
                return (
                  <>
                    <tbody className={styles.body}>
                      <tr className={styles.tr}>
                        <td>
                          <Image
                            src={orderItems.imagePath}
                            alt="??????"
                            width={150}
                            height={100}
                          />
                          <p>{`${orderItems.name}`}</p>
                        </td>
                        <td className={styles.sp}>
                          <span
                            className={styles.size}
                          >{`${orderItems.size}`}</span>
                          <span
                            className={styles.p}
                          >{`${orderItems.price.toLocaleString()}???`}</span>
                          <span
                            className={styles.p}
                          >{`${orderItems.quantity}???`}</span>
                        </td>
                        <td>
                          <ul>
                            {orderItems.orderToppingList.map(
                              (topping: any) => {
                                return (
                                  <>
                                    <li className={styles.list}>
                                      <div></div>
                                      <span
                                        className={styles.topping}
                                      >{`${topping}`}</span>
                                      <span className={styles.opp}>
                                        {`${orderItems.optionPrice}`}
                                        ???
                                      </span>
                                    </li>
                                  </>
                                );
                              }
                            )}
                          </ul>
                        </td>
                        <td className={styles.subtotal}>
                          {`${orderItems.subTotal.toLocaleString()}???`}{' '}
                        </td>
                        <td>
                          <div>
                            {del && (
                              <button
                                onClick={() =>
                                  onClickDelete(orderItems.id)
                                }
                                className={styles.clear}
                              >
                                ??????
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </>
                );
              })}
            </table>
            {data.map((data: any) => {
              total += data.subTotal;
            })}
            <div className={styles.total}>
              <div>{`????????????${Math.floor(
                total * 1.08 - total
              ).toLocaleString()}???`}</div>
              <div>{`????????????????????????${Math.floor(
                total * 1.08
              ).toLocaleString()}???????????????`}</div>
            </div>
            <button
              className={styles.btn}
              type="submit"
              onClick={oder}
            >
              {moji ? '???????????????' : '????????????????????????????????????'}
            </button>
            {testFlag && <OrderConfirmation />}
          </>
        )}
      </div>
    </>
  );
}
