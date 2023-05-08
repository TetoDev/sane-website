import sqlite3

conn = sqlite3.connect('cookies/data.sqlite')
c = conn.cursor()
def test():

    c.execute('SELECT * FROM data')
    cookies = {}

    results = c.fetchall()[0][5]
    print(results)
    # for name, value in results:
    #     cookies[name] = value
    conn.close()
    return cookies


print(test())