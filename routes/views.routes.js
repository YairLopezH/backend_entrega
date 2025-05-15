import { Router } from 'express';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';

const router = Router();

router.get('/products', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) filter.category = query;

    let sortOption = {};
    if (sort === 'asc') sortOption.price = 1;
    else if (sort === 'desc') sortOption.price = -1;

    const options = {
      limit: parseInt(limit),
      page: parseInt(page),
      sort: sortOption,
      lean: true,
    };

    const result = await Product.paginate(filter, options);

    const cartId = '6826567aada8ccd806c26121';

    res.render('products', {
      products: result.docs,
      totalPages: result.totalPages,
      prevPage: result.hasPrevPage ? result.prevPage : null,
      nextPage: result.hasNextPage ? result.nextPage : null,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      cartId,
    });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
});

router.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product').lean();
    if (!cart) return res.status(404).send('Carrito no encontrado');

    res.render('cartDetail', { cart });
  } catch (error) {
    res.status(500).send('Error al cargar carrito');
  }
});

export default router;
