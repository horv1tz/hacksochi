# from jose import JWTError, jwt
# from fastapi.security import OAuth2PasswordBearer
# from passlib.context import CryptContext
# import redis
# import json
# import redis
# from datetime import datetime, timedelta
# from pydantic import BaseModel

# SECRET_KEY = "your_jwt_secret"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 30

# redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# class Token(BaseModel):
#     access_token: str
#     token_type: str


# def hash_password(password: str):
#     return pwd_context.hash(password)


# def verify_password(plain_password, hashed_password):
#     return pwd_context.verify(plain_password, hashed_password)


# def authenticate_user(username: str, password: str, ):
#     user = json.loads(redis_client.get(username) or 'null')
#     if not user or not verify_password(password, user['hashed_password']):
#         return False
#     return user


# def create_access_token(data: dict, expires_delta: timedelta = None):
#     to_encode = data.copy()
#     if expires_delta:
#         expire = datetime.utcnow() + expires_delta
#     else:
#         expire = datetime.utcnow() + timedelta(minutes=15)
#     to_encode.update({"exp": expire})
#     encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
#     redis_client.setex(encoded_jwt, expires_delta.total_seconds(), data['sub'])  # Сохранение токена в Redis
#     return encoded_jwt
