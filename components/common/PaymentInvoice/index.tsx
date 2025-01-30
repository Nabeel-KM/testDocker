/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import styles from "./table.module.scss"
import { tableDataPayment } from './tableData'
import { FaCloudDownloadAlt } from "react-icons/fa"
interface props {
  InvoiceCheck?: boolean;
  StatusCheck?: boolean;
  statusAndInvoice?: boolean;
}
const PaymentInvoiceComp = (Props: props) => {
  let { InvoiceCheck, StatusCheck, statusAndInvoice } = Props

  const [loading, setLoading] = useState(false)
  return (
    <>
      <div className={styles.wrapper}>
        {tableDataPayment?.length === 0 ? (
          // <table className={styles.tablee}>
          //   <thead className="border-y  text-black">
          //     <tr className={styles.topText}>
          //       <th scope="col" className={styles.tableHeader}>
          //         Name
          //       </th>
          //       <th scope="col" className={styles.tableHeader}>
          //         Price
          //       </th>
          //       <th scope="col" className={styles.tableHeader}>
          //         Bid
          //       </th>
          //       <th scope="col" className={styles.tableHeader}>
          //         Time
          //       </th>
          //     </tr>
          //   </thead>
          // </table>
          <></>
        ) : (
          <table className={statusAndInvoice ? styles.statusAndVoice : styles.tablee}>
            {loading ? (
              ""
            ) : (
              <>
                <thead>
                  <tr>
                    <th scope="col">
                      Payment Invoice
                    </th>
                    <th scope="col">
                      Amount
                    </th>
                    <th scope="col">
                      Date and Time
                    </th>
                    {StatusCheck && <th scope="col">
                      Status
                    </th>}
                    {InvoiceCheck && <th scope="col">
                      Download Invoice
                    </th>}
                  </tr>
                </thead>
                {tableDataPayment?.map((item, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>
                          {item?.paymentInvoice}
                        </td>
                        <td>
                          {item?.amount}
                        </td>
                        <td>
                          {item.dateAndTime}
                        </td>
                        {StatusCheck &&
                          <td>
                            <span className={item.status === "verification" ? styles.verification : item.status === "request decline" ? styles.requestDecline : item.status === "approved" ? styles.approved : item.status === "processing" ? styles.processing : item.status === "pending" ? styles.pending : ""}>
                              <img src={item.status === "verification" ? "/icons/verification.svg" : item.status === "request decline" ? "/icons/request-decline.svg" : item.status === "approved" ? "/icons/approved.svg" : item.status === "processing" ? "/icons/processing.svg" : item.status === "pending" ? "/icons/pending.svg" : ""} alt='' />
                              {item.status}
                            </span>
                          </td>
                        }
                        {InvoiceCheck &&
                          <td>
                            <span className={styles.Invoice}>
                              <FaCloudDownloadAlt className={styles.Icon} />
                              Download Invoice
                            </span>
                          </td>
                        }
                      </tr>
                    </tbody>
                  );
                })}
              </>
            )}
          </table>
        )}


        {/* {loading ? (
          <div className="w-full min-h-[20rem] flex items-center justify-center">
            <WaveDate />
          </div>

        ) : FavouriteCoin?.length === 0 ? (
          <div className="w-full min-h-[20rem] flex dark:bg-[#1C2024] justify-center">
            <NoDataFound />
          </div>
        ) : (
          ""
        )} */}
      </div>
    </>
  )
}

export default PaymentInvoiceComp