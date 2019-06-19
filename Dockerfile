FROM ubuntu:16.04

ENV APP_HOME /catalog
WORKDIR $APP_HOME

RUN apt-get update -y && apt-get upgrade -y

RUN apt-get install -y python3-pip
RUN pip3 install --upgrade pip


COPY requirements.txt $APP_HOME/requirements.txt
RUN pip3 install -r requirements.txt

COPY . $APP_HOME

CMD python3 application.py
