package configs

import (
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	DB   MySQLConfig
	Auth AuthConfig
	API  APIConfig
}

type MySQLConfig struct {
	Username string
	Password string
	Address  string
	DBName   string
}

type AuthConfig struct {
	JWTSignKey                []byte
	JWTAccessTokenExpiration  int
	JWTRefreshTokenExpiration int
}

type APIConfig struct {
	APIPort     string
	FrontendUrl string
}

func ToInt(s string) int {
	i, err := strconv.Atoi(s)
	if err != nil {
		log.Fatalf("Invalid number on reading exp time: %s", s)
	}
	return i
}

func LoadConfig() (*Config, error) {
	pwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	err = godotenv.Load(filepath.Join(pwd, "../../.env"))
	if err != nil {
		log.Fatalf("Error loading .env file: %s.", err)
	}
	cfg := &Config{
		DB: MySQLConfig{
			Username: os.Getenv("MYSQL_BLOG_SERVICE_USER"),
			Password: os.Getenv("MYSQL_BLOG_SERVICE_PASSWORD"),
			Address:  os.Getenv("MYSQL_BLOG_ADDR"),
			DBName:   os.Getenv("MYSQL_BLOG_DB_NAME"),
		},
		Auth: AuthConfig{
			JWTSignKey:                []byte(os.Getenv("JWT_SIGN_KEY")),
			JWTAccessTokenExpiration:  ToInt(os.Getenv("JWT_ACCESS_TOKEN_EXPIRATION")),
			JWTRefreshTokenExpiration: ToInt(os.Getenv("JWT_REFRESH_TOKEN_EXPIRATION")),
		},
		API: APIConfig{
			APIPort:     os.Getenv("API_PORT"),
			FrontendUrl: os.Getenv("FRONTEND_URL"),
		},
	}
	return cfg, nil
}
