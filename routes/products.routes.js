import  Router  from "express";
import Product from "../models/product.model.js";

const router = Router();


router.get("/", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    
    let filter = {};
    if (query) {
      
      if (query.toLowerCase() === "disponible") filter.status = true;
      else filter.category = query;
    }


    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    else if (sort === "desc") sortOption.price = -1;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sortOption,
      lean: true
    };

    const result = await Product.paginate(filter, options);

    const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}${req.path}`;
    const queryString = new URLSearchParams(req.query);
    const createLink = (pageNum) => {
      queryString.set("page", pageNum);
      return `${baseUrl}?${queryString.toString()}`;
    };

    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage ? createLink(result.prevPage) : null,
      nextLink: result.hasNextPage ? createLink(result.nextPage) : null,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
