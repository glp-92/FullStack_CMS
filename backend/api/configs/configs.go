package configs

import (
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	DB   DBConfig
	Auth AuthConfig
	API  APIConfig
}

type DBConfig struct {
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
	envPath := filepath.Join(pwd, "../../.env")
	if _, err := os.Stat(envPath); err == nil {
		if err := godotenv.Load(envPath); err != nil {
			log.Printf("Warning: error loading .env file: %v", err)
		}
	} else {
		log.Println("No .env file found, relying on environment variables.")
	}

	cfg := &Config{
		DB: DBConfig{
			Username: os.Getenv("DB_BLOG_SERVICE_USER"),
			Password: os.Getenv("DB_BLOG_SERVICE_PASSWORD"),
			Address:  os.Getenv("DB_BLOG_ADDR"),
			DBName:   os.Getenv("DB_BLOG_DB_NAME"),
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
