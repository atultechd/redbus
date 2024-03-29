import React from "react";
import Styles from "./Payment.module.css";
import { MdAccountCircle } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { VscLocation } from "react-icons/vsc";
import { useSelector } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";

const Payment = () => {
  const passSeatsArray = useSelector((state) => state.busDetailsReducer.seats);
  const passFare = useSelector((state) => state.busDetailsReducer.fare);
  const passDepartDetails = useSelector(
    (state) => state.busDetailsReducer.departureDetails
  );
  const passArrivalDetails = useSelector(
    (state) => state.busDetailsReducer.arrivalDetails
  );

  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  console.log("Current Customer is: ", currentCustomer);
  const operatorName = useSelector(
    (state) => state.busDetailsReducer.operatorName
  );
  const passengerDetails = useSelector(
    (state) => state.busDetailsReducer.passengerDetails
  );
  console.log("here passenger details:", passengerDetails);
  const email = useSelector((state) => state.busDetailsReducer.email);
  const fare = useSelector((state) => state.busDetailsReducer.fare);
  const busId = useSelector((state) => state.busDetailsReducer.busId);
  const phoneNumber = useSelector(
    (state) => state.busDetailsReducer.phoneNumber
  );
  const departureDetails = useSelector(
    (state) => state.busDetailsReducer.departureDetails
  );
  const arrivalDetails = useSelector(
    (state) => state.busDetailsReducer.arrivalDetails
  );
  const duration = useSelector((state) => state.busDetailsReducer.duration);
  const isBusinessTravel = useSelector(
    (state) => state.busDetailsReducer.isBusinessTravel
  );
  const isInsurance = useSelector(
    (state) => state.busDetailsReducer.isInsurance
  );
  const isCovidDonated = useSelector(
    (state) => state.busDetailsReducer.isCovidDonated
  );
  const [product] = React.useState({
    name: "React from facebook",
    price: 10,
    productBy: "Facebook",
  });
  const history = useHistory();

  const makePayment = async (token) => {
    let myBooking = {};
    // create booking object
    myBooking.customerId = currentCustomer._id;
    myBooking.passengerDetails = passengerDetails;
    myBooking.email = email;
    myBooking.phoneNumber = phoneNumber;
    myBooking.fare = fare;
    myBooking.status = "upcoming";
    myBooking.busId = busId;
    let date = new Date();
    myBooking.bookingDate =
    date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    myBooking.seats = passSeatsArray;
    myBooking.departureDetails = departureDetails;
    myBooking.arrivalDetails = arrivalDetails;
    myBooking.duration = duration;
    myBooking.isBusinessTravel = isBusinessTravel;
    myBooking.isInsurance = isInsurance;
    myBooking.isCovidDonated = isCovidDonated;
    console.log("My booking is:", myBooking);

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/v1/api/booking`,
        myBooking
      );
      history.push("/my-profile");
      console.log("Booking post response: ", res.data);
    } catch (err) {
      console.log("Error while adding booking to booking collection!", err);
    }

    // const body = {
    //   token,
    //   product,
    // };
    // const headers = {
    //   "Content-Type": "application/json",
    // };
    // //fire a request to backend
    // return fetch(`${process.env.REACT_APP_BACKEND_URL}/v1/api/stripe-payments`, {
    //   method: "POST",
    //   headers,
    //   body: JSON.stringify(body),
    // })
    //   .then((res) => {
    //     //console.log("RESPONSE REACT", res);
    //     // const { status } = res;
    //     //console.log("STATUS REACT", status);
    //     //console.log("redirecting:");
    //     // history.push("/my-profile");
    //     console.log("hii udit", res);
    //   })
    //   .catch((err) => {
    //     console.log("Error while making payment", err);
    //     alert(
    //       "Something went wrong while making payment! Check Internet connection!"
    //     );
    //   });
  };

  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  return (
    <div>
      {/* Full Container */}
      <div className={Styles.payment__fullContainer}>
        {/* left Container */}
        <div className={Styles.payment__fullContainer_leftContainer}>
          <input
            className={
              Styles.payment__fullContainer_rightContainer_inputOfferCOde
            }
            placeholder="ENTER OFFER CODE"
          />
          <div className={Styles.payment__fullContainer_rightContainer_infobar}>
            <div className={Styles.banner_chip}>
              <img
                src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/safe-payments.svg"
                alt="CC"
              />
              <div className={Styles.banner_text}>
                <div>Safe and Secure</div>
                <div>Online Payments</div>
              </div>
            </div>
            <div className={Styles.banner_chip}>
              <img
                src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/transactions.svg"
                alt="Million Transactions"
              />
              <div className={Styles.banner_text}>
                <div>60+ million</div>
                <div>transactions</div>
              </div>
            </div>
            <div className={Styles.banner_chip}>
              <img
                src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/trust.svg"
                alt="Reliable"
              />
              <div className={Styles.banner_text}>
                <div>10+ years of</div>
                <div>Trust</div>
              </div>
            </div>
          </div>
          <div
            className={
              Styles.payment__fullContainer_leftContainer_paymentInstruments
            }
          >
            {/************************ Stripe Payemnt Start ******************************************/}
            <div className={Styles.Payment__stripe}>
              <StripeCheckout
                stripeKey="pk_test_51OZtNQSDjzfm8yZUon8CbN1GJwUv7Prq5PpE7RQhsHi2MkEJTNqFqpeUeaYTLsGmH5VdZ9ierpatG9HP2IIYX1q800uFqW3c53"
                token={makePayment}
                name="RedBus Booking"
              >
                <button className={Styles.Payment__stripe__button}>
                  Pay With Stripe
                </button>
              </StripeCheckout>
            </div>
            {/************************ Stripe Payemnt End ******************************************/}
            <div className={Styles.choose_payment_heading}>
              Choose Other Payment Method
            </div>
            <div
              className={
                Styles.payment__fullContainer_leftContainer_paymentInstrument
              }
            >
              <div
                className={
                  Styles.payment__fullContainer_leftContainer_eachPaymentInstruments
                }
              >
                <input className={Styles.radioButton} type="radio" />
                <div className={Styles.radioButtonText}>Credit Card</div>
                <div className={Styles.paymentIconList}>
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/mobile/v2/visa.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/mobile/v2/mastercard.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/maestro.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={
                  Styles.payment__fullContainer_leftContainer_eachPaymentInstruments
                }
              >
                <input className={Styles.radioButton} type="radio" />
                <div className={Styles.radioButtonText}>Debit Card</div>
                <div className={Styles.paymentIconList}>
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/mobile/v2/visa.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/mobile/v2/mastercard.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/maestro.png"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={
                  Styles.payment__fullContainer_leftContainer_eachPaymentInstruments
                }
              >
                <input className={Styles.radioButton} type="radio" />
                <div className={Styles.radioButtonText}>Wallets</div>
                <img
                  className={Styles.payment_icon_img}
                  src="https://st.redbus.in/paas/images/web/v2/amazonpay.png"
                  alt=""
                />
              </div>
              <div
                className={
                  Styles.payment__fullContainer_leftContainer_eachPaymentInstruments
                }
              >
                <input className={Styles.radioButton} type="radio" />
                <div className={Styles.radioButtonText}>Net Banking</div>
                <div className={Styles.paymentIconList}>
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/axis.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/sbi.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/hdfc.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/icici.png"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/kotak.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className={Styles.UpiPaymentText}>
              UPI PAYMENT USING PHONEPAY / GPAY / AMAZONPAY ETC...
            </div>
            <div
              className={
                Styles.payment__fullContainer_leftContainer_paymentInstrument
              }
            >
              <div
                className={
                  Styles.payment__fullContainer_leftContainer_eachPaymentInstruments
                }
              >
                <input className={Styles.radioButton} type="radio" />
                <div className={Styles.radioButtonText}>
                  Pay through QR Code
                </div>
                <div
                  className={
                    Styles.payment__fullContainer_leftContainer_eachPaymentInstruments_new
                  }
                >
                  New
                </div>
                <div className={Styles.paymentIconList}>
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/upi/gpay.svg"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/upi/phonepe.svg"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/upi/amazonpay.svg"
                    alt=""
                  />
                </div>
              </div>
              <div
                className={
                  Styles.payment__fullContainer_leftContainer_eachPaymentInstruments
                }
              >
                <input className={Styles.radioButton} type="radio" />
                <div className={Styles.radioButtonText}>Pay through UPI ID</div>
                <div
                  className={
                    Styles.payment__fullContainer_leftContainer_eachPaymentInstruments_new
                  }
                >
                  New
                </div>
                <div className={Styles.paymentIconList}>
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/upi/gpay.svg"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/upi/phonepe.svg"
                    alt=""
                  />
                  <img
                    className={Styles.payment_icon_img}
                    src="https://st.redbus.in/paas/images/web/v2/upi/amazonpay.svg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right Container */}
        <div className={Styles.payment__fullContainer_rightContainer}>
          <div
            className={
              Styles.payment__fullContainer_rightContainer_trip_container
            }
          >
            <div className={Styles.travel_operator_info}>
              <div className={Styles.travel_title}>{operatorName}</div>
              <div className={Styles.travel_specification}>
                Seater / A/C / Sleeper
              </div>
            </div>
            <div className={Styles.line}></div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "200px",
                }}
              >
                <MdDateRange className={Styles.icons} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className={Styles.travel_specification}>
                    Booking Date
                  </div>
                  <div style={{ display: "flex", width: "150px" }}>
                    <div>{year + "/" + month + "/" + day}</div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "10px",
                }}
              >
                <div>Seats Booked</div>
                <div>{passSeatsArray.join(", ")}</div>
              </div>
            </div>
            <div className={Styles.line}></div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "150px",
                }}
              >
                <VscLocation className={Styles.icons} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div className={Styles.travel_specification}>
                    Boarding Point
                  </div>
                  <div>{passDepartDetails.city}</div>
                  <div>{passDepartDetails.location}</div>
                  <div>{passDepartDetails.date}</div>
                  <div>{passDepartDetails.time}:00</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div className={Styles.travel_specification}>
                  Dropping Point
                </div>
                <div>{passArrivalDetails.city}</div>
                <div>{passArrivalDetails.location}</div>
                <div>{passArrivalDetails.date}</div>
                <div>{passArrivalDetails.time}:00</div>
              </div>
            </div>
            <div className={Styles.passangerInfo}>
              <MdAccountCircle className={Styles.icons} />
              <div className={Styles.passangerName}>{currentCustomer.name}</div>
            </div>
          </div>
          <div
            className={
              Styles.payment__fullContainer_rightContainer_fair_container
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className={Styles.travel_title}>FARE BREAKUP</div>
              <img
                src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/down.svg"
                width="14"
                height="14"
                alt=""
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <div
                className={Styles.travel_specification}
                style={{ fontWeight: "bold" }}
              >
                Total Payable
              </div>
              <div
                className={Styles.travel_specification}
                style={{ fontWeight: "bold" }}
              >
                Rs. {passFare}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "10px",
              width: "95%",
            }}
          >
            <img
              className={Styles.payment_banner_icon_img}
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/master-card-secure-code.png"
              alt=""
            />
            <img
              className={Styles.payment_banner_icon_img}
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/verified-by-visa.svg"
              alt=""
            />
            <img
              className={Styles.payment_banner_icon_img}
              src="https://s3.rdbuz.com/Images/webplatform/Common/Payment/verisign-secured.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
