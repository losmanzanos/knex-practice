INSERT INTO blogful_articles (title, date_published, content)
VALUES
    ('A Fishy Story', now() - '21 days'::INTERVAL, 'Here fishy, fishy...'),
    ('A Tale of Two Cities', now(), 'Some words...'),
    ('Test', now(), 'Blah, blah, blah...');