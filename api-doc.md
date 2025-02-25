# API Documentation for KMLA Warehouse v2.0
## 1. Log
#### GET
전체 리스트 | /api/logs/list
로그 정보 | /api/logs/:id
#### POST
로그 생성 | /api/logs/ | user(String), item(String), quantity(Number), type(String)
물품 반납 | /api/logs/:id/return

#### DELETE
로그 삭제 | /api/logs/:id

## Item
#### GET
전체 리스트 (status == valid인 것들만) | /api/item/list
전체 리스트 (status 상관없이 전부) | /api/item/list-all
물품 정보 | /api/item/:id
#### POST
물품 생성 | /api/item/ | body: name(String), description(String), quantity(Number), location(String), image(Image file) [request format: form]
#### PATCH 
물품 수정 | /api/item/:id | body: name(String), description(String), quantity(Number), location(String), image(Image file) [request format: form] *optional
물품 대여 | /api/item/:id/borrow | body: quantity(Number), user(String)
#### DELETE 
물품 삭제 | /api/item/:id

# 백엔드 설명 (for 프런트엔드)
## 1. Item, Log Schema (DB상 구조)
### Item:
- name
- description
- totalQuantity (전체 수량)
- quantity (잔여 수량)
- location (예시: C-101)
- status (valid는 대여 가능한 물품, deleted는 삭제된 / 대여 불가능한 물품)
- imageUrl (물건 사진 링크, 이미지 표시할 때는 이 링크 사용하면 됨)
- imageKey (DB 관련된 내용, 프런트엔드는 고려할 필요 X)

### Log:
- user (대여 / 반납한 유저, String)
- item (대여 / 반납된 물건, ObjectId)
- quantity (대여 / 반납된 수량)
- timestamp
- type (borrow / return)
- status (active는 borrow type의 로그가 가질 수 있으며, 그 로그에 해당하는 물품이 대여되었으나 반납은 않되었을 때의 상태임. 만약 유저가 물건을 반납하면 반납 로그와 그에 해당하는 대여 로그 모두 status가 closed로 바뀜.)

## 2. API 사용 관련
API 요청은 위의 API Docs를 참고하여 보내면 됨. 왠만하면 직접 create / delete 등 기초적인 API Call을 이용하기보다 borrow / return 등 더 편리한 API를 사용하면 프런트엔드 / 백엔드 모두 좋음. 뭔가 복잡한 로직이 필요하면 create / delete 등으로 구현하지 말고 백엔드 쪽에 만들어달라고 하면 만들어줄 것이고 그게 전체적으로 코드가 보기 예뻐짐.

## 3. 로그인 관련
조유찬이 알려줄거임. 조유찬은 로그인 구현 완료되면 부디 여기에 간단한 설명 작성좀.