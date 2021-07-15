# Carros 📝

## Listar Carros cadastrados
### Request

`GET api/car`

 #### Query


|   NAME   | description                             | required |     |
|:--------:| --------------------------------------- |:--------:| --- |
|  brand   | car brand                               | &cross;  |     |
|  model   | car model                               | &cross;  |     |
| version  | car version                             | &cross;  |     |
| minYear  | minimum of year car value in the range  | &cross;  |     |
| maxYear  | maximum of year car value in the range  | &cross;  |     |
| mileage  | car mileage                             | &cross;  |     |
| minPrice | minimum of price car value in the range | &cross;  |     |
| maxPrice | maximum of price car value in the range | &cross;  |     |


### Response
`Lista de Carros cadastrados`

```json
[
  {
    "brand": "Toyota",
    "model": "Corolla",
    "version": "GLi",
    "year": 2020,
    "mileage": 5256,
    "gearbox": "automatic",
    "price": 75000,
    "id": "60f05fc7dcb93d0015c70cd3"
  }
]
```

## Buscar por um carro específico
### Request

`GET api/car/:id`

### Response
`Carro com o id indicado`
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "version": "GLi",
  "year": 2020,
  "mileage": 5256,
  "gearbox": "automatic",
  "price": 75000,
  "id": "60f05fc7dcb93d0015c70cd3"
}

```
## Cadastrar um Carro
### Request

 #### Body
 |  NAME   |  TYPE  | REQUIRED |     |
 |:-------:|:------:|:--------:|:---:|
 |  brand  | string | &check;  |     |
 |  model  | string | &check;  |     |
 | version | string | &check;  |     |
 |  year   | number | &check;  |     |
 | mileage | number | &check;  |     |
 | gearbox | string | &check;  |     |
 |  price  | number | &check;  |     |

 `POST api/car`
```json
{
	"brand": "Toyota",
	"model": "Corolla",
	"version": "GLi",
	"year": 2020,
	"mileage": 5256,
	"gearbox": "automatic",
	"price": 75000
}
```

### Response
`Carro cadastrado`
```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "version": "GLi",
  "year": 2020,
  "mileage": 5256,
  "gearbox": "automatic",
  "price": 75000,
  "id": "60f05fc7dcb93d0015c70cd3"
}
```
 ## Atualizar um Carro
 |  NAME   |  TYPE  | REQUIRED |     |
 |:-------:|:------:|:--------:|:---:|
 |  brand  | string | &cross;  |     |
 |  model  | string | &cross;  |     |
 | version | string | &cross;  |     |
 |  year   | number | &cross;  |     |
 | mileage | number | &cross;  |     |
 | gearbox | string | &cross;  |     |
 |  price  | number | &cross;  |     |

### Request



 `PUT /car/:id`
```json
{
	"brand": "Hyundai"
}
```

### Response
``` No Body returned for response - 204```

 ## Deletar uma Prova
### Request

 `DELETE /car/:id`

### Response
``` No Body returned for response - 204```
