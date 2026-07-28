import { getDashboardData, getSellerProductsService,
    createProductService,
    deleteSellerProductService, getSellerProductByIdService,
    updateSellerProductService ,getSellerOrdersService,
    updateOrderStatusService } from "../services/sellerService.js";


export const getDashboard = async (req, res) => {

    try {

        const dashboard = await getDashboardData(req.user._id);

        return res.status(200).json({
            success: true,
            dashboard
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }

};


export const getSellerProducts = async (req, res) => {
    try {
        const products = await getSellerProductsService(req.user._id);

        return res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const createProduct = async (req, res) => {
     console.log("========== CREATE PRODUCT ==========");
    console.log(req.body);
    console.log("subCategory:", req.body.subCategory);
    console.log("files:", req.files);
    try {
        const product = await createProductService(
            req.user._id,
            req.body,
            req.files
        );

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            product,
        });

    } catch (error) {

        console.error("Create Product Error:");
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteSellerProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    await deleteSellerProductService(
      req.user._id,
      productId
    );

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerProductById = async (req, res) => {
    try {

        const product = await getSellerProductByIdService(
            req.user._id,
            req.params.id
        );

        return res.json({
            success: true,
            product,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

export const updateSellerProduct = async (req, res) => {

    try {

        const product = await updateSellerProductService(
            req.user._id,
            req.params.id,
            req.body,
            req.files
        );

        return res.json({
            success: true,
            message: "Product updated successfully",
            product,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const getSellerOrders = async (req, res) => {

    try {

        const orders = await getSellerOrdersService(req.user._id);

        return res.json({
            success: true,
            orders,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

export const updateOrderStatus = async (req, res) => {

    try {

        const order = await updateOrderStatusService(
            req.user._id,
            req.params.id,
            req.body.status
        );

        return res.json({
            success: true,
            message: "Order updated successfully",
            order,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};