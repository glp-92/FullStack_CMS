FROM golang:1.23.4-alpine AS builder
RUN apk add --no-cache git
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY cmd /app/cmd
COPY configs /app/configs
COPY internal /app/internal
COPY pkg /app/pkg
WORKDIR /app/cmd/server
RUN go mod tidy && go build -o /server .

FROM scratch
WORKDIR /app
COPY --from=builder /server . 
EXPOSE 8080
ENTRYPOINT ["/app/server"]
