import streamlit as st
from streamlit_option_menu import option_menu
import requests
import qrcode
from PIL import Image
import csv
import pandas as pd
import time
import os

def storeData():
    image_file = st.file_uploader("Upload An data",type=['csv'])
    if image_file is not None:
        file_details = {"FileName":image_file.name,"FileType":image_file.type}
        st.write(file_details)
        with open(os.path.join("data",image_file.name),"wb") as f: 
            f.write(image_file.getbuffer())         
        st.success("Saved File")
        df = pd.read_csv(image_file)
        st.write(df)

def snd(phone, msg):
    dataAdd = {
    "phone": phone,
    "msg": msg,
    }
    requests.post("http://localhost:3000/api?", json=dataAdd)

def getFile():
    uid=[]
    dr = os.listdir("D:\python project\myProject\Bealajar_c++\AutoForwading\whatsapp-main\data")
    option = st.selectbox(
    'Choese File',
    (dr))
    st.write('You selected:', option)
    with open("D:\python project\myProject\Bealajar_c++\AutoForwading\whatsapp-main\data\{op}".format(op=option), encoding='UTF-8') as f:
        rows = csv.reader(f,delimiter=",",lineterminator="\n")
        next(rows, None)
        for row in rows:
            user = {}
            user['phone'] = int(row[0])
            uid.append(user)
    return uid
def sendMessage(msg):
    xa = getFile()
    if st.button("send message"):
        for phn in xa:
            x = "+{dt}".format(dt=phn['phone'])
            st.text("success sending message to: ")
            st.text(x)
            snd(x, msg)
            time.sleep(3)
        st.success('Success sending message', icon="✅")

def login():
    st.title("whatsapp-bot")
    if st.button("get qrcode"):
        res = requests.get("http://localhost:3000/login")
        sj = res.json()
        img = qrcode.make(sj["qr"])
        img.save("last.png")
        im = Image.open("last.png")
        st.image("last.png")
        print(sj["qr"])

with st.sidebar:
    selected = option_menu("Main Menu", ["Login", "Upload File", 'Send Message'], 
        icons=['house', 'gear'], menu_icon="cast", default_index=0)
    selected
if selected == "Upload File":
    storeData()
elif selected == "Send Message":
    psn = st.text_area(label="enter message here")
    sendMessage(psn)
elif selected == "Login":
    login()
