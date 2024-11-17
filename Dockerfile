FROM node:20.13-alpine AS builder
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN npm i -g pnpm@9.0.6
RUN npm i -g vite@5.2.0
RUN pnpm i
COPY . .

# startof ENV
ENV VITE_FIREBASE_API_KEY=AIzaSyAQj7_qoiltVPYWX5tpeyHBw-hvu06UmlE
ENV VITE_FIREBASE_AUTH_DOMAIN=bpsdm-65664.firebaseapp.com
ENV VITE_FIREBASE_DATABASE_URL=https://smartkmsystem-2705f-default-rtdb.asia-southeast1.firebasedatabase.app
ENV VITE_FIREBASE_PROJECT_ID=bpsdm-65664
ENV VITE_FIREBASE_STORAGE_BUCKET=bpsdm-65664.appspot.com
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=530076811777
ENV VITE_FIREBASE_APP_ID=1:530076811777:web:6f9966bf49b56d3a22f600
ENV VITE_FIREBASE_MEASUREMENT_ID=G-YJHDFE0D04

ENV VITE_API_AUTH_SERVICE_URL=http://km-bpsdm.jakarta.go.id:30721
ENV VITE_API_GAMIFICATION_SERVICE_URL=http://km-bpsdm.jakarta.go.id:32441
ENV VITE_API_STRAPI_SERVICE_URL=https://km-bpsdm.jakarta.go.id/api
ENV VITE_STRAPI_API_TOKEN=6c2d4c0902046b1279ddcf1d50665ee5b8c5c45bf0a54871c1833c62cb9c9890fd3b55db10ed1d23f6e08a317f5ed470b7688f347ef6dd27447be7472306bcfb84ebb5322672d85d2dace584ae1dd53434d286c9d9ad5c9f3de748f5c93c5899c37294d5000adcdb67b7f1ebd9bd4c46705fb945e3eda3c4da7d234c75ba825e

ENV VITE_KMS_URL=http://km-bpsdm.jakarta.go.id:30246
# endof ENV

RUN pnpm build

FROM nginx:stable-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 5001
CMD ["nginx", "-g", "daemon off;"]
