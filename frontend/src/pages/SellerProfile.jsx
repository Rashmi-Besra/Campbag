import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getSellerProfile, getSellerProducts } from "../services/sellerProfileService";

import SellerHeader from "../components/seller/SellerHeader";
import SellerStats from "../components/seller/SellerStats";
import SellerProducts from "../components/seller/SellerProducts";

const SellerProfile = () => {
    const { sellerId } = useParams();

    const [seller, setSeller] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSellerData();
    }, [sellerId]);

    const fetchSellerData = async () => {
        try {
            setLoading(true);

            const sellerRes = await getSellerProfile(sellerId);
            const productRes = await getSellerProducts(sellerId);

            setSeller(sellerRes.seller);
            setProducts(productRes.products);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center py-20">
                Loading seller profile...
            </div>
        );
    }

    if (!seller) {
        return (
            <div className="text-center py-20">
                Seller not found.
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">

            <SellerHeader seller={seller} />

            <SellerStats seller={seller} />

            <SellerProducts products={products} />

        </div>
    );
};

export default SellerProfile;