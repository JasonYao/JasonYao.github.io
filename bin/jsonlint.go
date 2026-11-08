package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
)

func validate(path string) error {
	file, err := os.Open(path)
	if err != nil {
		return err
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	var value json.RawMessage
	if err := decoder.Decode(&value); err != nil {
		return err
	}

	if err := decoder.Decode(&value); err != io.EOF {
		if err == nil {
			return fmt.Errorf("multiple JSON values")
		}
		return err
	}

	return nil
}

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage: jsonlint <file>...")
		os.Exit(1)
	}

	failed := false
	for _, path := range os.Args[1:] {
		if err := validate(path); err != nil {
			fmt.Fprintf(os.Stderr, "%s: %v\n", path, err)
			failed = true
		}
	}

	if failed {
		os.Exit(1)
	}
}
