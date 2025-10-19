FROM golang:1.23.4

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY cmd /app/cmd
COPY configs /app/configs
COPY internal /app/internal
COPY pkg /app/pkg

WORKDIR /app/cmd/server
RUN go mod tidy && go build -o /app/server .

CMD ["/app/server"]