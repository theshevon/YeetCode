def recur(i):
    if i <= 0:
        return 1
    print(i)
    return recur(i-1)+recur(i-2);
    
print(recur(10))