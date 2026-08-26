import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client.connect(("localhost", 5000))

message = input("Enter message: ")
client.send(message.encode())

response = client.recv(1024).decode()
print("Server:", response)

client.close()