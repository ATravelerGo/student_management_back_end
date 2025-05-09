FROM node:latest
LABEL authors="chen"

# 设置工作目录
WORKDIR /app

# 拷贝package.json 、lock文件 到工作目录 因为WORKDIR 已经设置了
COPY package*.json ./

RUN npm install

# 拷贝源代码
COPY . .

# 构建nestjs项目
RUN npm run build

# 启动命令
CMD ["node","dist/main"]



