import express, { Request, Response } from 'express'
import { products, ProductsStore } from '../model/products'
import client from '../database'
import jwt from 'jsonwebtoken'
import verifyAuthToken from '../middleware/verify'
const store = new ProductsStore()
const index = async (_req: Request, res: Response): Promise<products[] | undefined> => {
  try {
    const weapen = await store.index() as unknown as products[]
    return res.status(200).json(weapen) as unknown as products[]
  } catch (err) {
    res.status(400)
    res.json(`products cannot be creted because ${err}`)
  }
}

const show = async (_req: Request, res: Response): Promise<products | undefined> => {
  try {
    const weapen = await store.show(_req.params.id) as unknown as products
    return res.status(200).json(weapen) as unknown as products
  } catch (err) {
    res.status(400)
    res.json(`products cannot be creted because ${err}`)
  }
}

const create = async (req: Request, res: Response): Promise<void> => {
  const productstore: products = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price
  }
  try {
    const weapen = await store.create(productstore)
    res.status(200).json(weapen)
  } catch (err) {
    res.status(400)
    res.json(`products cannot be creted because ${err}`)
  }
}
const delet = async (req: Request, res: Response): Promise<products | undefined> => {
  try {
    const weapen = await store.delete(req.params.id) as unknown as products
    return res.status(200).json(weapen) as unknown as products
  } catch (err) {
    res.status(400)
    res.json(`products cannot be creted because ${err}`)
  }
}
const myproduct = (app: express.Application): void => {
  app.get('/products', verifyAuthToken, index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
  app.delete('/products/:id', delet)
}
export default myproduct
