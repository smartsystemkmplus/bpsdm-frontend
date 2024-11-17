FROM node:20.13-alpine AS builder
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN npm i -g pnpm@9.0.6
RUN npm i -g vite@5.2.0
RUN pnpm i
COPY . .


ENV VITE_FIREBASE_API_KEY="AIzaSyDHb1QG3EEmbAKaPfingVS4r6Enkfeju4I"
ENV VITE_FIREBASE_AUTH_DOMAIN=smartkmsystem-2705f.firebaseapp.com
ENV VITE_FIREBASE_DATABASE_URL=https://smartkmsystem-2705f-default-rtdb.asia-southeast1.firebasedatabase.app
ENV VITE_FIREBASE_PROJECT_ID=smartkmsystem-2705f
ENV VITE_FIREBASE_STORAGE_BUCKET=smartkmsystem-2705f.appspot.com
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=634072245724
ENV VITE_FIREBASE_APP_ID=1:634072245724:web:bc597de032b02082f95b19
ENV VITE_API_EMPLOYEES_SERVICE_URL=https://employee.portaverse.co.id
ENV VITE_API_REPOSITORY_SERVICE_URL=https://repository.portaverse.co.id
ENV VITE_API_INNOVATION_SERVICE_URL=https://innovation.portaverse.co.id
ENV VITE_SSO_URL=https://sso.portaverse.co.id
ENV VITE_KMS_URL=https://knowledge.portaverse.co.id
ENV VITE_LMS_URL=https://learning.portaverse.co.id
ENV VITE_TMS_URL=https://talent.portaverse.co.id
ENV VITE_MEET_URL=https://meet.portaverse.co.id

RUN pnpm build

FROM nginx:stable-alpine AS server
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 5001
CMD ["nginx", "-g", "daemon off;"]
