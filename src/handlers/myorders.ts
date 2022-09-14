import express, { Request, Response } from 'express'
import { orders, OrderStore } from '../model/orders'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/verify'
const store = new OrderStore()
const index = async (_req: Request, res: Response): Promise<orders[] | undefined> => {
  jwt.verify(_req.body.token, process.env.TOKEN_SECRET as unknown as string)
  try {
    const weapen = await store.index() as unknown as orders[]
    return res.status(200).json(weapen) as unknown as orders[]
  } catch (err) {
    res.status(400)
    res.json(`products cannot be creted because ${err}`)
  }
}

const showcurrent = async (req: Request, res: Response): Promise<orders | undefined> => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET as unknown as string)
  try {
    const weapen = await store.showcurrent(req.params.id)
    return res.status(200).json(weapen) as unknown as orders
  } catch (err) {
    res.status(400)
    res.json(`products cannot be creted because ${err}`)
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  const OrderStore: orders = {
    id: req.body.id,
    status: req.body.status,
    user_id: req.body.user_id,
    products_id: req.body.products_id,
    quantity: req.body.quantity
  }
  jwt.verify(req.body.token, process.env.TOKEN_SECRET as unknown as string)
  try {
    const weapen = await store.create(OrderStore)
    res.status(200).json(weapen)
  } catch (err) {
    res.status(400).json(err)
  }
}
const delet = async (req: Request, res: Response): Promise<void> => {
  jwt.verify(req.body.token, process.env.TOKEN_SECRET as unknown as string)
  const weapen = await store.delete(req.params.id)
  res.json(weapen)
}
const addProduct = async (_req: Request, res: Response): Promise<void> => {
  const orderId: string = _req.params.id
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
const myorder = (app: express.Application): void => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, showcurrent)
  app.post('/orders', verifyAuthToken, create)
  app.delete('/orders/:id', delet)
  app.post('/orders/:id/products', addProduct)
}
export default myorder
