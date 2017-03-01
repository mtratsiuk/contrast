FROM couchdb:1.6.1-couchperuser

ARG CONTRAST_COUCH_SECRET=secret

COPY local.ini /usr/local/etc/couchdb/
RUN echo "secret = $CONTRAST_COUCH_SECRET" >> /usr/local/etc/couchdb/local.ini
