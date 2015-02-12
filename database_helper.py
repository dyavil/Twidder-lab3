import sqlite3
import json
from flask import g

def connect_db():
	return sqlite3.connect("database.db")

def get_db():
	db = getattr(g, 'db', None)
	if db is None:
		db = g.db = connect_db()
	return db

def add_user(email, password, firstname, familyname, gender, city, country):
	c = get_db()
	c.execute("INSERT INTO users (email, password, firstname, familyname, gender, city, country, token) values(?, ?, ?, ?, ?, ?, ?)", (email, password, firstname, familyname, gender, city, country, ""))
	c.commit()


def get_user(email, password, token):
	c = get_db()
	print "db1"
	cursor = c.cursor()
	print email
	cursor.execute("UPDATE users SET token = ? WHERE email = ? AND password = ?", (token, email, password))
	cursor.execute("SELECT * FROM users WHERE email = ? AND password = ?", (email, password))
	print password
	result = [dict(email=row[0], firstname=row[2], familyname=row[3], gender=row[4], city=row[5], country=row[6], token=row[7]) for row in cursor.fetchall()]
	print result
	cursor.close()
	print "trtrtrtrt"
	if cursor.rowcount == 0:
		return None
	return json.dumps(result[0])

def get_user_info(token):
	c = get_db()
	cursor = c.cursor()
	cursor.execute("SELECT * FROM users WHERE token = ?", (token, ))
	result = [dict(email=row[0], firstname=row[2], familyname=row[3], gender=row[4], city=row[5], country=row[6]) for row in cursor.fetchall()]
	if cursor.rowcount == 0:
		cursor.close()
		return None
	cursor.close()
	return json.dumps(result[0])

def get_user_info_email(email):
	c = get_db()
	cursor = c.cursor()
	cursor.execute("SELECT * FROM users WHERE email = ?", (email, ))
	result = [dict(email=row[0], firstname=row[2], familyname=row[3], gender=row[4], city=row[5], country=row[6]) for row in cursor.fetchall()]
	if cursor.rowcount == 0:
		cursor.close()
		return None
	cursor.close()
	return json.dumps(result[0])

def get_user_messages(token):
	c = get_db()
	cursor=c.cursor()
	cursor.execute("SELECT email FROM users WHERE token = ?", (token, ))
	useremail = cursor.fetchone()
	cursor.execute("SELECT * FROM messages WHERE writer = ? OR receiver = ?", (useremail, useremail))
	result = [dict(writer=row[1], content=row[2], receiver=row[3]) for row in cursor.fetchall()]
	if cursor.rowcount == 0:
		cursor.close()
		return None
	cursor.close()
	return json.dumps(result)

def get_user_messages_email(email):
	c = get_db()
	cursor=c.cursor()
	cursor.execute("SELECT * FROM messages WHERE writer = ? OR receiver = ?", (email, email))
	result = [dict(writer=row[1], content=row[2], receiver=row[3]) for row in cursor.fetchall()]
	if cursor.rowcount == 0:
		cursor.close()
		return None
	cursor.close()
	return json.dumps(result)


def insert_user(email, password, firstname, familyname, gender, city, country, token):
	c = get_db()
	cursor = c.cursor()
	cursor.execute("INSERT INTO users (email, password, firstname, familyname, gender, city, country, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", (email, password, firstname, familyname, gender, city, country, token))
	result = [dict(email=row[0], firstname=row[2], familyname=row[3], gender=row[4], city=row[5], country=row[6], token=row[7]) for row in cursor.fetchall()]
	cursor.close()
	return json.dumps(result[0])

def sign_out(token):
	c = get_db()
	cursor = c.cursor()
	cursor.execute("UPDATE users SET token = '' WHERE token = ?", (token, ))
	cursor.close()

def change_password(token, old_password, new_password):
	c =get_db()
	cursor = c.cursor()
	cursor.execute("UPDATE users SET password = ? WHERE token = ? and password = ?", (new_password, token, old_password))
	cursor.close()

def post_message(token, message, email):
	c = get_db()
	cursor=c.cursor()
	cursor.execute("SELECT email FROM users WHERE token = ?", (token, ))
	useremail = cursor.fetchone()
	cursor.execute("INSERT INTO messages (writer, content, receiver) VALUES (?, ?, ?)", (useremail, message, email))
	#TODO change db : email = primary key
	pass

def db_close():
	get_db().close()