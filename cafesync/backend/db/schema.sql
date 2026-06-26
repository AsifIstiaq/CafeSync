-- ROLES TABLE
CREATE TABLE roles (
  role_id NUMBER PRIMARY KEY,
  role_name VARCHAR2(20) UNIQUE NOT NULL
);

-- USERS
CREATE TABLE users (
  user_id NUMBER PRIMARY KEY,
  name VARCHAR2(100),
  email VARCHAR2(100) UNIQUE NOT NULL,
  password_hash VARCHAR2(255) NOT NULL,
  phone VARCHAR2(20),
  role_id NUMBER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_user_role FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- MENU ITEMS
CREATE TABLE menu_item (
  item_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR2(100),
  description VARCHAR2(255),
  price NUMBER(10,2),
  category VARCHAR2(50),
  availability NUMBER(1) DEFAULT 1,
  image_url VARCHAR2(255)
);

-- CAFE TABLES
CREATE TABLE cafe_table (
  table_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  table_number NUMBER,
  capacity NUMBER,
  status VARCHAR2(20) DEFAULT 'available',
  location VARCHAR2(100)
);

-- ORDERS
CREATE TABLE order_table (
  order_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id NUMBER,
  table_id NUMBER,
  coupon_id NUMBER,
  status VARCHAR2(20) DEFAULT 'pending',
  total_amount NUMBER(10,2),
  payment_status VARCHAR2(20) DEFAULT 'unpaid',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_order_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- ORDER ITEMS
CREATE TABLE order_item (
  order_item_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id NUMBER,
  item_id NUMBER,
  quantity NUMBER,
  unit_price NUMBER(10,2),
  notes VARCHAR2(255),
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES order_table(order_id)
);

-- RESERVATION
CREATE TABLE reservation (
  reservation_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id NUMBER,
  table_id NUMBER,
  reserved_at TIMESTAMP,
  party_size NUMBER,
  status VARCHAR2(20),
  CONSTRAINT fk_res_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- PAYMENT
CREATE TABLE payment (
  payment_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id NUMBER,
  method VARCHAR2(30),
  amount NUMBER(10,2),
  transaction_id VARCHAR2(100),
  status VARCHAR2(20),
  paid_at TIMESTAMP
);

-- SUBSCRIPTION
CREATE TABLE subscription (
  sub_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id NUMBER,
  plan_type VARCHAR2(50),
  start_date DATE,
  end_date DATE,
  price NUMBER(10,2),
  status VARCHAR2(20),
  CONSTRAINT fk_sub_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- INVENTORY
CREATE TABLE inventory (
  inventory_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ingredient_name VARCHAR2(100),
  quantity NUMBER,
  unit VARCHAR2(20),
  reorder_level NUMBER,
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REVIEW
CREATE TABLE review (
  review_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id NUMBER,
  item_id NUMBER,
  rating NUMBER,
  comment VARCHAR2(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COUPON
CREATE TABLE coupon (
  coupon_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code VARCHAR2(50) UNIQUE,
  discount_type VARCHAR2(20),
  value NUMBER(10,2),
  expiry DATE,
  usage_limit NUMBER,
  used_count NUMBER DEFAULT 0
);

-- MEMBERSHIP CARD
CREATE TABLE membership_card (
  card_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id NUMBER,
  tier VARCHAR2(20),
  points NUMBER DEFAULT 0,
  issue_date DATE,
  expiry_date DATE,
  CONSTRAINT fk_card_user FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- NOTIFICATION
CREATE TABLE notification (
  notif_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id NUMBER,
  type VARCHAR2(50),
  message VARCHAR2(255),
  is_read NUMBER DEFAULT 0,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- QUEUE TOKEN
CREATE TABLE queue_token (
  token_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_id NUMBER,
  token_number NUMBER,
  status VARCHAR2(20),
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  served_at TIMESTAMP
);