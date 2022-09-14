import { orders, OrderStore } from '../model/orders'
import { products, ProductsStore } from '../model/products'
import { User, Usernn } from '../model/user'
import jwt from 'jsonwebtoken'
import myorder from '../handlers/myorders'
import myproduct from '../handlers/myproducts'
import mount from '../handlers/myusers'
import app from '../index'
import supertest from 'supertest'
import { request } from 'express'
const store = new OrderStore()
const store2 = new ProductsStore()
const store3 = new Usernn()
let token = '' as unknown as string
describe('products Model', () => {
  it('should have an index method', () => {
    expect(store2.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store2.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store2.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store2.delete).toBeDefined()
  })

  it('create method should add a products', async () => {
    const result = await store2.create({
      id: 1,
      name: 'kero',
      price: 300
    })
    expect(result).toEqual({
      id: 1,
      name: 'kero',
      price: 300
    })
  })

  it('index method should return a list of products', async () => {
    const result = await store2.index()
    expect(result).toEqual([{
      id: 1,
      name: 'kero',
      price: 300
    }])
  })

  it('show method should return the correct products', async () => {
    const result = await store2.show('1')
    expect(result).toEqual({
      id: 1,
      name: 'kero',
      price: 300
    })
  })
  // it('delete method should remove theproducts', async () => {
  //   await store2.delete('1')
  //   const result = await store2.index()

  //   expect(result).toEqual([])
  // })
})

describe('user Model', () => {
  it('should have an index method', () => {
    expect(store3.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store3.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store3.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store3.delete).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result = await store3.create({
      id: 1,
      username: 'kero',
      password: 'hello',
      firstname: 'kerolos',
      lastname: 'hanna'
    })
    token = jwt.sign(
      { result },
      process.env.TOKEN_SECRET as unknown as string
    )
    expect(result.id).toEqual(1)
    expect(result.username).toEqual('kero')
    expect(result.password).not.toEqual('hello')
    expect(result.firstname).toEqual('kerolos')
    expect(result.lastname).toEqual('hanna')
  })

  it('index method should return a list of user', async () => {
    const result = await store3.index()
    expect(result[0].id).toEqual(1)
    expect(result[0].username).toEqual('kero')
    expect(result[0].password).not.toEqual('hello')
    expect(result[0].firstname).toEqual('kerolos')
    expect(result[0].lastname).toEqual('hanna')
  })

  it('show method should return the correct user', async () => {
    const result = await store3.show('1')

    expect(result.id).toEqual(1)
    expect(result.username).toEqual('kero')
    expect(result.password).not.toEqual('hello')
    expect(result.firstname).toEqual('kerolos')
    expect(result.lastname).toEqual('hanna')
  })
  // it('delete method should remove theuser', async () => {
  //   await store3.delete('1')
  //   const result = await stor0e3.index()

  //   expect(result).toEqual([])
  // })
})
describe('order Model without delete', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a showcurrent method', () => {
    expect(store.showcurrent).toBeDefined()
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('create method should add a order', async () => {
    const result = await store.create({
      id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    })
    expect(result).toEqual({
      id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    })
  })

  it('index method should return a list of orders', async () => {
    const result = await store.index()
    expect(result).toEqual([{
      id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    }])
  })

  it('show method should return the correct order by user_id', async () => {
    const result = await store.showcurrent('1')
    expect(result).toEqual({
      id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    })
  })
})
describe('Test endpoint responses', (): void => {
  it('gets the api endpoint ', (done): void => {
    void supertest(app).get('/').expect(200, done)
  }
  )
  it('gets the api endpoint create orders', async (): Promise<void> => {
    const hg = {
      id: 2,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30,
      token
    }
    const res = await supertest(app).post('/orders').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 2,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    })
  }
  )
  it('gets the api endpoint show all orders', async (): Promise<void> => {
    const hg = {
      token
    }
    const res = await supertest(app).get('/orders').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{
      id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    }, {
      id: 2,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    }])
  }
  )
  it('gets the api endpoint delete orders', async (): Promise<void> => {
    const hg = {
      token
    }
    const res = await supertest(app).delete('/orders/2').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toEqual('')
  }
  )
  it('gets the api endpoint show a select orders by user_id', async (): Promise<void> => {
    const hg = {
      token
    }
    const res = await supertest(app).get('/orders/1').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      id: 1,
      status: 'open',
      user_id: '1',
      products_id: '1',
      quantity: 30
    })
  }
  )
  it('gets the api endpoint delete orders', (): void => {
    const hg = {
      token
    }
    void supertest(app).delete('/orders/2').send(hg).expect(400)
  }
  )
  it('gets the api endpoint create products', async (): Promise<void> => {
    const hg = {
      id: 2,
      name: 'kero',
      price: 300,
      token
    }
    const res = await supertest(app).post('/products').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ id: 2, name: 'kero', price: 300 })
  }
  )
  it('gets the api endpoint show all products', async (): Promise<void> => {
    const res = await supertest(app).get('/products')
    expect(res.status).toBe(200)
    expect(res.body).toEqual([{ id: 1, name: 'kero', price: 300 }, {
      id: 2,
      name: 'kero',
      price: 300
    }])
  }
  )
  it('gets the api endpoint delete products', async (): Promise<void> => {
    const res = await supertest(app).delete('/products/2')
    expect(res.status).toBe(200)
    expect(res.body).toEqual('')
  }
  )
  it('gets the api endpoint show a select products', async (): Promise<void> => {
    const res = await supertest(app).get('/products/1')
    expect(res.status).toBe(200)
    expect(res.body.id).toEqual(1 as unknown as number)
    expect(res.body.name).toBe('kero')
    expect(res.body.price).toBe(300)
  }
  )
  it('gets the api endpoint delete products', (): void => {
    void supertest(app).delete('/products/2').expect(400)
  }
  )
  it('gets the api endpoint create users', async (): Promise<void> => {
    const hg = {
      id: 2,
      username: 'kero',
      password: 'hello',
      firstname: 'kerolos',
      lastname: 'hanna'
    }
    const res = await supertest(app).post('/users').send(hg)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(2 as unknown as number)
    expect(res.body.username).toBe('kero')
    expect(res.body.password).not.toBe('hello')
    expect(res.body.firstname).toBe('kerolos')
    expect(res.body.lastname).toBe('hanna')
  })
  it('gets the api endpoint show all users', async (): Promise<void> => {
    const hg = { token }
    const res = await supertest(app).get('/users').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body[0].id).toBe(1 as unknown as number)
    expect(res.body[1].id).toBe(2 as unknown as number)
    expect(res.body[0].username).toBe('kero')
    expect(res.body[1].username).toBe('kero')
    expect(res.body[0].password).not.toBe('hello')
    expect(res.body[1].password).not.toBe('hello')
    expect(res.body[0].firstname).toBe('kerolos')
    expect(res.body[1].firstname).toBe('kerolos')
    expect(res.body[0].lastname).toBe('hanna')
    expect(res.body[1].lastname).toBe('hanna')
  }
  )
  it('gets the api endpoint delete users', async (): Promise<void> => {
    const res = await supertest(app).delete('/users/2').set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body).toEqual('')
  }
  )
  it('gets the api endpoint show a select users', async (): Promise<void> => {
    const hg = { token }
    const res = await supertest(app).get('/users/1').send(hg).set('Authorization', 'Bearer ' + token)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(1 as unknown as number)
    expect(res.body.username).toBe('kero')
    expect(res.body.password).not.toBe('hello')
    expect(res.body.firstname).toBe('kerolos')
    expect(res.body.lastname).toBe('hanna')
  }
  )
  it('gets the api endpoint delete unknown user', (): void => {
    void supertest(app).delete('/users/2').expect(400)
  }
  )
})
describe('delete', () => {
  it('should delete orders', async () => {
    await store.delete('1')
    const result = await store.index()

    expect(result).toEqual([])
  })
  it('should delete user', async () => {
    await store3.delete('1')
    const result = await store3.index()

    expect(result).toEqual([])
  })
  it('should delete products', async () => {
    await store2.delete('1')
    const result = await store2.index()

    expect(result).toEqual([])
  })
})
