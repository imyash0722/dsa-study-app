with open("src/data/units/unit4/topics/file-io-redirection.ts", "r") as f:
    content = f.read()

content = content.replace(
    "description: 'How to use the operating system\\'s command line",
    "description: \"How to use the operating system's command line"
)
content = content.replace(
    "line of your C code.',",
    "line of your C code.\","
)

content = content.replace(
    "content: 'A classic systems interview question: \"Why do we have stderr if stdout prints to the screen anyway?\" Answer: \"Because of redirection. If a user runs ./app > out.txt, they won\\\"t see the screen. If a fatal error occurs and is printed to stdout, it goes silently into the file. By printing to stderr, the error bypasses the > redirection and appears safely on the user's screen, while the normal data goes to the file.\"\",",
    "content: `A classic systems interview question: \"Why do we have stderr if stdout prints to the screen anyway?\" Answer: \"Because of redirection. If a user runs ./app > out.txt, they won't see the screen. If a fatal error occurs and is printed to stdout, it goes silently into the file. By printing to stderr, the error bypasses the > redirection and appears safely on the user's screen, while the normal data goes to the file.\"`,"
)

with open("src/data/units/unit4/topics/file-io-redirection.ts", "w") as f:
    f.write(content)
