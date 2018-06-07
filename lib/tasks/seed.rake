require "ffaker"

namespace :db do
  desc "Fake data"
  task seed: :environment do
    puts "================== START =================="
    executed_time do
      puts "Generating service..."
      services = []
      10.times do
        services << {
          name: FFaker::Company.name
        }
      end
      Service.create services

      puts "Generating client..."
      clients = []
      1.times do
        clients << {
          name: FFaker::Company.name,
          credit: 100
        }
      end
      Client.create clients

      puts "Generating user..."
      users = []
      Client.all.each do |client|
        users << {
          name: FFaker::Name.name,
          email: FFaker::Internet.email,
          password: FFaker::Internet.password,
          client: client
        }
      end
      User.create users

      puts "Generating apps..."
      clients = Client.all
      apps = []
      Service.all.each_with_index do |service, i|
        apps << {
          name: "App #{i}",
          client: clients.sample,
          service: service
        }
      end
      App.create apps

      puts "Generating request..."
      requests = []
      App.all.each do |app|
        500.times do |i|
          origin_text = FFaker::Lorem.paragraph
          requests << {
            origin_text: origin_text,
            start_time: i.hours.ago,
            end_time: (i-1).hours.ago,
            input_type: ["voice", "text"].sample,
            output_type: ["audio", "text"].sample,
            status: [0, 1].sample,
            number_of_words: origin_text.split.length,
            tts_engine_ip: FFaker::Internet.ip_v4_address,
            device_id: FFaker::Internet.ip_v4_address,
            app_id: app.id,
            voice_name: "VOICE NAME"
          }
        end
      end
      Request.collection.insert_many requests

      # puts "Generating admin..."
      # Admin.create email: 'admin@gmail.com', password: '123123',
      #   name: 'Admin'
    end
    puts "================== END =================="
  end

  desc "Create duration for Request"
  task duration: :environment do
    puts "================== START =================="

    executed_time do
      Request.all.each do |request|
        request.update_attributes duration: request.end_time.to_i - request.start_time.to_i
        print "."
      end
    end

    puts "================== END =================="
  end

  def executed_time
    beginning = Time.zone.now
    begin
      yield
    ensure
      puts "Time elapsed #{Time.zone.now - beginning} seconds"
      Rails.logger.info "Time elapsed #{Time.zone.now - beginning} seconds"
    end
  end
end
