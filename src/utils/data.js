const getDetail = () => {
  return [
    {
      "error": false,
      "status": "success",
      "data": {
        "product": {
          "id": "product-IKqPltKAqIRWSNPw",
          "name": "Sambal Baby Cumi",
          "image": "https://picsum.photos/200",
          "price": 50000,
          "description": "Joglo Ayu Tenan is an Indonesian manufacturer of handmade jewelry, fashion accesories, jewelry display , homedeco (cushion, walldeco, table runner,napkin, throw , macrame plant hanger). All products made from variety of materials comes from Indonesia: stones, cooper, silver, seashell, beads, wood, bamboo (jewelry/fashion accesories/display) and natural dyed , ecoprinted organic fabrics , natural fibre (homedeco).",
          "resources": [
            {
              "name": "cabai",
              "umkm": "Sukamaju",
              "image": "https://picsum.photos/200",
              "location": {
                "lat": -34.397,
                "lng": 150.644,
                "name": "Wonogiri, Jawa Tengah",
              },
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
              "name": "batu",
              "umkm": "Sukamaju",
              "image": "https://picsum.photos/200",
              "location": {
                "lat": -34.397,
                "lng": 150.644,
                "name": "Wonogiri, Jawa Tengah",
              },
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
              "name": "batu",
              "image": "https://picsum.photos/200",
              "location": {
                "lat": -34.397,
                "lng": 150.644,
                "name": "New York, US",
              },
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            }
          ],
          "production": [
            {
              "name": "pengumpulan bahan baku",
              "image": "https://picsum.photos/200",
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
              "name": "penumbukan",
              "image": "https://picsum.photos/200",
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
              "name": "pengemasan",
              "image": "https://picsum.photos/200",
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            }
          ],
          "impact": [
            {
              "name": "Impact 1",
              "image": "https://picsum.photos/200",
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
              "name": "Impact 2",
              "image": "https://picsum.photos/200",
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            },
            {
              "name": "Impact 3",
              "image": "https://picsum.photos/200",
              "deskripsi": "Lorem ipsum dolor sit amet consectetur adipisicing elit."
            }
          ],
          "contribution": [1, 2, 4],
          "umkm": {
            "id": "Umkm-VKDhH1FD3QbdzH6s",
            "logo": "https://picsum.photos/200",
            "name": "PT Sambal",
            "location": {
              "lat": -34.397,
              "lng": 150.644,
              "name": "Wonogiri, Jawa Tengah"
            },
            "employe": 1000
          },
          "category": 1,
          "createdAt": "2023-11-22T06:58:51.120Z",
          "updatedAt": "2023-11-22T06:58:51.120Z"
        }
      }
    }
  ]
}
const getAllProduct = () => {
  return [

    {
      "error": false,
      "status": "success",
      "message": "Menampilkan semua produk",
      "count": 3,
      "data": {
        "products": [
          {
            "id": "product-3_PabLrYn6okMUwr",
            "name": "Sambal Baby Cumi",
            "image": "https://picsum.photos/200",
            "price": 10000,
            "category": 1
          },
          {
            "id": "product--4PQjQTklQLDLsB2",
            "name": "Product 2",
            "image": "https://picsum.photos/200",
            "price": 30000,
            "category": 2
          },
          {
            "id": "product-IKqPltKAqIRWSNPw",
            "name": "Product 3",
            "image": "https://picsum.photos/200",
            "price": 50000,
            "category": 3
          }
        ]
      }
    }
  ]
}

export { getDetail, getAllProduct };