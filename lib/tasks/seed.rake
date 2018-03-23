require "ffaker"

namespace :db do
  desc "Fake data"
  task seed: :environment do
    puts "================== START =================="
    executed_time do
      puts "Generating server..."
      servers = []
      100.times do
        servers << {
          server: FFaker::Internet.ip_v4_address,
          database: FFaker::Internet.domain_word,
          username: FFaker::Internet.user_name,
          password: FFaker::Internet.password
        }
      end
      Server.create servers

      puts "Generating service and subservice..."
      services = []
      20.times do
        services << {
          type: rand(3),
          name: FFaker::Company.name
        }
      end
      Service.create services

      subservices = []
      Service.all.each_with_index do |service, i|
        subservices << {
          name: "Subservice#{i}",
          service_id: service.id
        }
      end
      Subservice.create subservices

      puts "Generating client..."
      all_service_ids = Service.all.pluck :id
      clients = []
      clients << {name: 'Pham Tuan Sang', email: 'client@gmail.com',
        password: '123123', service_ids: all_service_ids.shuffle.first(6)}
      20.times do
        clients << {
          name: FFaker::Name.name,
          email: FFaker::Internet.email,
          password: FFaker::Internet.password,
          service_ids: all_service_ids.shuffle.first(rand(1..5))
        }
      end
      Client.create clients

      puts "Generating request..."
      all_client_ids = Client.all.pluck :id
      requests = []
      Subservice.all.each do |subservice|
        10000.times do |i|
          content = FFaker::Lorem.paragraph
          requests << {
            content: content,
            start_time: i.hours.ago,
            end_time: (i-1).hours.ago,
            input_type: ["voice", "text"].sample,
            output_type: ["audio", "text"].sample,
            status: ["success", "error"].sample,
            token_number: content.split.length,
            tts_engine_ip: FFaker::Internet.ip_v4_address,
            device_id: FFaker::Internet.ip_v4_address,
            client_id: all_client_ids.sample,
            subservice_id: subservice.id
          }
        end
      end
      Request.collection.insert_many requests

      puts "Generating server_request..."
      server_requests = []
      all_server_ids = Server.all.pluck :id
      Request.all.each do |request|
        10.times do |i|
          server_requests << {
            server: all_server_ids.sample,
            action: "Action#{i}"
          }
        end
      end
      ServerRequest.collection.insert_many server_requests

      puts "Generating admin..."
      Admin.create email: 'admin@gmail.com', password: '123123',
        name: 'Admin'
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
