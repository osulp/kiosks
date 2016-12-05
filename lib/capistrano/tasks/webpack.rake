namespace :webpack do
  set :yarn, 'yarn'

  task :precompile do
    on roles(:web) do
      execute fetch(:yarn), 'run compile'
    end
  end
end