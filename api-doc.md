# API Documentation for KMLA Warehouse v2.0
## 1. Log
#### GET
전체 리스트 | /api/logs/list
로그 정보 | /api/logs/:id
#### POST
로그 생성 | /api/logs/ | user(String), item(String), quantity(Number), type(String)

#### DELETE
로그 삭제 | /api/logs/:id

## Item
#### GET
전체 리스트 | /api/item/list
물품 정보 | /api/item/:id
#### POST
물품 생성 | /api/item/ | body: name(String), description(String), quantity(Number), location(String), image(Image file) [request format: form]
#### PATCH 
물품 업데이트 | /api/item/:id | body: name(String), description(String), quantity(Number), location(String), image(Image file) [request format: form] *optional
물품 대여 | /api/item/:id/borrow | body: quantity(Number), user(String)
#### DELETE 
물품 삭제 | /api/item/:id

## Auth
#### GET 
현재 로그인된 유저 정보 가져오기 | /api/auth
#### POST
로그인 | /auth/login
로그아웃 | /auth/logout

## Refresh
#### GET
새 리프래쉬 토큰 | /api/refresh


// Create Team example
Request with CURL in Windows!!
curl -X POST http://localhost:3000/api/team/ -H "Content-Type: application/json" -d "{""username"" : ""LoginTestUsername"", ""password"" : ""LoginTestPassword"", ""name"" : ""LoginTestName""}"
Request with CURL in MacOS!!
curl -X POST http://localhost:3000/api/team/ -H 'Content-Type: application/json' -d '{"username" : "LoginTestUsername", "password" : "LoginTestPassword", "name" : "LoginTestName"}'




*****Important*****
use authService or axiosPrivate for requests or you will get auth errors



Request with Axios // just an example, do not use it in this form, use async and send multiple requests at once (Promise.all)
axios.post('/api/team/', {
    username: "LoginTestUsername",
    password: "LoginTestPassword",
    name: "LoginTestName",
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });


axios.get("/api/team/list")


async {
  try {
    const response = await <Promise>;

  } catch(e) {
    console.log(e.message);
    
  }
}

<Promise>.then(response => ).error(error => )

PUT 사용 시 유의점!
각 데이터 종류에 대해 그것이 가지는 *모든* 하위 항목에 대한 정보를 줘야 함. Ex) Item 고칠거면 name, description, tags, category, location, status, availableQuantity, totalQuantity

Item Image 사용 방법
Get 하면 imageUrl 값이 있음. 그 값을 img 태그의 src 링크에 넣으면 됨.