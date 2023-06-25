FROM --platform=linux/amd64 node:current-buster
RUN mkdir /opt/jdk
RUN cd /opt

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openjdk-11-jre
WORKDIR /app

# ENV NODE_ENV development

ENV DB_HOST=''
ENV DB_PORT=''
ENV DB_DBNAME=''
ENV DB_USERNAME=''
ENV DB_PASSWORD=''

COPY . .

RUN yarn install --frozen-lockfile
EXPOSE 4030

ENV PORT 4030

CMD ["yarn", "dev"]