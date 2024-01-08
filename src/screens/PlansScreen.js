import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import db from "../firebase";
import "./PlansScreen.css";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);
  const testKey =
    "pk_test_51OVdoeLDlBzDV6VMgUDlbUpZJfpLfaD6kYlpT7MwsZ4H1ENj4JALCmvgdXtke8XAWmnQREokNgdz8eiHj7ILyeml00gC1wHGqI";

  useEffect(() => {
    const docRef = doc(db, "customers", user.uid);
    const colRef = collection(docRef, "subscriptions");

    const subs = async () => {
      const querySnapshot = await getDocs(colRef);

      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
      });
    };

    return subs;
  }, [user.uid]);

  useEffect(() => {
    const productCollection = query(
      collection(db, "products"),
      where("active", "==", true)
    );

    const productArray = async () => {
      const querySnapshot = await getDocs(productCollection);
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));
        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
        setProducts(products);
      });
    };
    productArray();
  }, []);

  console.log(products, "products");

  const loadCheckout = async (priceId) => {
    const docRef = doc(db, "customers", user.uid);
    const colRef = collection(docRef, "checkout_sessions");
    addDoc(colRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });
    const onSnapshot = await getDocs(colRef);

    const unSubscribe = onSnapshot.docs.map(async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured: ${error.message}`);
      }
      if (sessionId) {
        const stripeLoader = await loadStripe(testKey);
        stripeLoader.redirectToCheckout({ sessionId });
      }
    });
    return unSubscribe;
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p>
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div className="plansScreen_plan">
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button onClick={() => loadCheckout(productData?.prices?.priceId)}>
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
