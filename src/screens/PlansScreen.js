import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const subscriptionsCollectionRef = collection(
          doc(db, "customers", user.uid),
          "subscriptions"
        );

        const querySnapshot = await getDocs(subscriptionsCollectionRef);

        querySnapshot.forEach((subscriptionDoc) => {
          const subscriptionData = subscriptionDoc.data();
          setSubscription({
            role: subscriptionData.role,
            current_period_end: subscriptionData.current_period_end.seconds,
            current_period_start: subscriptionData.current_period_start.seconds,
          });
        });
      } catch (error) {
        console.error("Error fetching subscriptions: ", error);
      }
    };

    if (user?.uid) {
      fetchSubscription();
    }
  }, [user?.uid]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch products where "active" == true
        const productsCollectionRef = collection(db, "products");
        const productsQuery = query(
          productsCollectionRef,
          where("active", "==", true)
        );
        const querySnapshot = await getDocs(productsQuery);

        const products = {};

        for (const productDoc of querySnapshot.docs) {
          const productData = productDoc.data();
          const pricesCollectionRef = collection(productDoc.ref, "prices");
          const priceSnapshot = await getDocs(pricesCollectionRef);

          const prices = priceSnapshot.docs.map((priceDoc) => ({
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          }));

          products[productDoc.id] = {
            ...productData,
            prices,
          };
        }

        setProducts(products);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const loadCheckout = async (priceId) => {
    try {
      const customerDocRef = doc(db, "customers", user.uid);

      const checkoutSessionsCollectionRef = collection(
        customerDocRef,
        "checkout_sessions"
      );

      const docRef = await addDoc(checkoutSessionsCollectionRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      onSnapshot(docRef, async (snap) => {
        const data = snap.data();

        if (!data) {
          console.error("No data found in the snapshot");
          return;
        }

        const { error, sessionId } = data;

        if (error) {
          alert(`An error occurred: ${error.message}`);
        }

        if (sessionId) {
          const stripe = await loadStripe(
            "pk_live_51QXwtfJKQKKTZ2p4rDCghmVgvuTjRiZ3xBhHz6qtyzqNl7M9KN9bHpz4Amqln1RMMvyvP24qILzcv9QnWRD8kUdo00N6qao679"
          );
          stripe.redirectToCheckout({ sessionId });
        }
      });
    } catch (error) {
      console.error("Error in loadCheckout:", error);
    }
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
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen_plan--disabled"
            } plansScreen_plan`}
          >
            <div className="plansScreen_info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices[0].priceId)
              }
            >
              {isCurrentPackage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
