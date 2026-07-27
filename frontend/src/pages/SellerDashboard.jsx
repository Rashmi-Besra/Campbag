import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/sellerService";

const SellerDashboard = () => {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard();
                setDashboard(data.dashboard);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Seller Dashboard</h1>
            <pre>{JSON.stringify(dashboard, null, 2)}</pre>
        </div>
    );
};

export default SellerDashboard;